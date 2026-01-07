import os
import sqlite3

from flask import Flask, jsonify, request, g
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

STOCK_DB_PATH = os.environ.get(
    "STOCK_DB_PATH", os.path.join(os.path.dirname(__file__), "stock.sqlite3")
)

SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS variants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  size TEXT NOT NULL,
  color TEXT,
  gender TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(product_id, size, color, gender),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory_levels (
  variant_id INTEGER NOT NULL PRIMARY KEY,
  quantity_on_hand INTEGER NOT NULL DEFAULT 0 CHECK(quantity_on_hand >= 0),
  quantity_reserved INTEGER NOT NULL DEFAULT 0 CHECK(quantity_reserved >= 0),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (variant_id) REFERENCES variants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory_movements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  variant_id INTEGER NOT NULL,
  delta INTEGER NOT NULL,
  reason TEXT NOT NULL,
  reference TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (variant_id) REFERENCES variants(id) ON DELETE CASCADE
);
"""


def get_db():
    if "db" not in g:
        conn = sqlite3.connect(STOCK_DB_PATH)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        g.db = conn
    return g.db


@app.teardown_appcontext
def close_db(exception):
    conn = g.pop("db", None)
    if conn is not None:
        conn.close()


def init_stock_db():
    os.makedirs(os.path.dirname(STOCK_DB_PATH), exist_ok=True)
    conn = sqlite3.connect(STOCK_DB_PATH)
    try:
        conn.execute("PRAGMA foreign_keys = ON")
        conn.executescript(SCHEMA_SQL)
        conn.commit()
    finally:
        conn.close()


def seed_stock_db():
    """Idempotent seed for local development."""
    conn = sqlite3.connect(STOCK_DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        conn.execute("PRAGMA foreign_keys = ON")

        conn.execute(
            "INSERT OR IGNORE INTO products (slug, name) VALUES (?, ?)",
            ("one-sleeve-classic", "One Sleeve Classic"),
        )
        product_row = conn.execute(
            "SELECT id FROM products WHERE slug = ?", ("one-sleeve-classic",)
        ).fetchone()
        if product_row is None:
            conn.commit()
            return

        product_id = int(product_row["id"])
        seed_levels = {"S": 8, "M": 3, "L": 0}
        for size, on_hand in seed_levels.items():
            sku = f"one-sleeve-classic-{size}"
            conn.execute(
                """
                INSERT OR IGNORE INTO variants (product_id, sku, size, color, gender)
                VALUES (?, ?, ?, NULL, NULL)
                """,
                (product_id, sku, size),
            )

            variant_row = conn.execute("SELECT id FROM variants WHERE sku = ?", (sku,)).fetchone()
            if variant_row is None:
                continue

            variant_id = int(variant_row["id"])
            conn.execute(
                """
                INSERT OR IGNORE INTO inventory_levels (variant_id, quantity_on_hand, quantity_reserved)
                VALUES (?, ?, 0)
                """,
                (variant_id, int(on_hand)),
            )

        conn.commit()
    finally:
        conn.close()


def find_variant_id(db: sqlite3.Connection, slug: str, size: str):
    row = db.execute(
        """
        SELECT v.id AS variant_id
        FROM products p
        JOIN variants v ON v.product_id = p.id
        WHERE p.slug = ? AND v.size = ?
        """,
        (slug, size),
    ).fetchone()
    if row is None:
        return None
    return int(row["variant_id"])


def get_level(db: sqlite3.Connection, variant_id: int):
    row = db.execute(
        """
        SELECT quantity_on_hand, quantity_reserved
        FROM inventory_levels
        WHERE variant_id = ?
        """,
        (variant_id,),
    ).fetchone()
    if row is None:
        return None
    return int(row["quantity_on_hand"]), int(row["quantity_reserved"])


def update_reserved(db: sqlite3.Connection, variant_id: int, new_reserved: int):
    db.execute(
        """
        UPDATE inventory_levels
        SET quantity_reserved = ?, updated_at = datetime('now')
        WHERE variant_id = ?
        """,
        (int(new_reserved), int(variant_id)),
    )


def insert_movement(db: sqlite3.Connection, variant_id: int, delta: int, reason: str, reference):
    db.execute(
        """
        INSERT INTO inventory_movements (variant_id, delta, reason, reference)
        VALUES (?, ?, ?, ?)
        """,
        (int(variant_id), int(delta), str(reason), reference),
    )


@app.route("/api/stock", methods=["GET"])
def get_stock():
    slug = request.args.get("slug")
    if not slug:
        return jsonify({"error": "Missing required query param: slug"}), 400

    db = get_db()
    rows = db.execute(
        """
        SELECT v.size AS size,
               (il.quantity_on_hand - il.quantity_reserved) AS available
        FROM products p
        JOIN variants v ON v.product_id = p.id
        JOIN inventory_levels il ON il.variant_id = v.id
        WHERE p.slug = ?
        """,
        (slug,),
    ).fetchall()

    if not rows:
        return jsonify({"error": "Unknown slug"}), 404

    sizes = {}
    for row in rows:
        size = row["size"]
        available = row["available"]
        if size is None:
            continue
        if available is None:
            sizes[size] = 0
        else:
            sizes[size] = max(0, int(available))

    return jsonify({"slug": slug, "sizes": sizes})


@app.route("/api/stock/reserve", methods=["POST"])
def reserve_stock():
    payload = request.json or {}
    slug = payload.get("slug")
    size = payload.get("size")
    quantity = payload.get("quantity")
    reference = payload.get("reference")

    if not slug or not size or quantity is None:
        return (
            jsonify({"error": "Required fields: slug, size, quantity"}),
            400,
        )

    try:
        qty = int(quantity)
    except (TypeError, ValueError):
        return jsonify({"error": "quantity must be an integer"}), 400

    if qty <= 0:
        return jsonify({"error": "quantity must be > 0"}), 400

    db = get_db()
    try:
        db.execute("BEGIN IMMEDIATE")

        variant_id = find_variant_id(db, str(slug), str(size))
        if variant_id is None:
            db.execute("ROLLBACK")
            return jsonify({"error": "Unknown variant"}), 404

        level = get_level(db, variant_id)
        if level is None:
            db.execute("ROLLBACK")
            return jsonify({"error": "Missing inventory level"}), 409

        on_hand, reserved = level
        available = on_hand - reserved
        if available < qty:
            db.execute("ROLLBACK")
            return (
                jsonify({"error": "Insufficient stock", "available": max(0, available)}),
                409,
            )

        new_reserved = reserved + qty
        update_reserved(db, variant_id, new_reserved)
        insert_movement(db, variant_id, 0, "reserve", reference)

        db.execute("COMMIT")
        return jsonify(
            {
                "slug": str(slug),
                "size": str(size),
                "reserved": new_reserved,
                "available": max(0, on_hand - new_reserved),
            }
        )
    except Exception:
        try:
            db.execute("ROLLBACK")
        except Exception:
            pass
        return jsonify({"error": "Reserve failed"}), 500


@app.route("/api/stock/release", methods=["POST"])
def release_stock():
    payload = request.json or {}
    slug = payload.get("slug")
    size = payload.get("size")
    quantity = payload.get("quantity")
    reference = payload.get("reference")

    if not slug or not size or quantity is None:
        return (
            jsonify({"error": "Required fields: slug, size, quantity"}),
            400,
        )

    try:
        qty = int(quantity)
    except (TypeError, ValueError):
        return jsonify({"error": "quantity must be an integer"}), 400

    if qty <= 0:
        return jsonify({"error": "quantity must be > 0"}), 400

    db = get_db()
    try:
        db.execute("BEGIN IMMEDIATE")

        variant_id = find_variant_id(db, str(slug), str(size))
        if variant_id is None:
            db.execute("ROLLBACK")
            return jsonify({"error": "Unknown variant"}), 404

        level = get_level(db, variant_id)
        if level is None:
            db.execute("ROLLBACK")
            return jsonify({"error": "Missing inventory level"}), 409

        on_hand, reserved = level
        if reserved < qty:
            db.execute("ROLLBACK")
            return (
                jsonify({"error": "Cannot release more than reserved", "reserved": reserved}),
                409,
            )

        new_reserved = reserved - qty
        update_reserved(db, variant_id, new_reserved)
        insert_movement(db, variant_id, 0, "release", reference)

        db.execute("COMMIT")
        return jsonify(
            {
                "slug": str(slug),
                "size": str(size),
                "reserved": new_reserved,
                "available": max(0, on_hand - new_reserved),
            }
        )
    except Exception:
        try:
            db.execute("ROLLBACK")
        except Exception:
            pass
        return jsonify({"error": "Release failed"}), 500


if __name__ == "__main__":
    init_stock_db()
    seed_stock_db()
    app.run(debug=True, port=3500, host="localhost")
