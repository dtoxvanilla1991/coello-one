import json
import os
import urllib.error
import urllib.request


def request_json(url: str, method: str = "GET", payload: dict | None = None):
    data = None
    headers = {"accept": "application/json"}

    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["content-type"] = "application/json"

    req = urllib.request.Request(url, data=data, headers=headers, method=method)

    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            raw = response.read().decode("utf-8")
            return response.status, json.loads(raw)
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8") if e.fp else ""
        try:
            parsed = json.loads(raw) if raw else {"error": "http_error"}
        except json.JSONDecodeError:
            parsed = {"error": "http_error", "raw": raw}
        return e.code, parsed


def main() -> int:
    base_url = os.environ.get("FLASK_API_BASE_URL", "http://localhost:3500")
    slug = os.environ.get("STOCK_SMOKE_SLUG", "one-sleeve-classic")

    status, stock = request_json(f"{base_url}/api/stock?slug={slug}")
    if status != 200:
        print(f"FAIL: GET /api/stock returned {status}: {stock}")
        return 1

    sizes = stock.get("sizes")
    if not isinstance(sizes, dict) or not sizes:
        print(f"FAIL: /api/stock returned invalid sizes: {stock}")
        return 1

    selected_size = None
    for size, qty in sizes.items():
        if isinstance(qty, int) and qty > 0:
            selected_size = size
            break

    if selected_size is None:
        print(f"FAIL: no size has available stock: {sizes}")
        return 1

    reserve_payload = {
        "slug": slug,
        "size": selected_size,
        "quantity": 1,
        "reference": "smoke-test",
    }

    status, reserved = request_json(
        f"{base_url}/api/stock/reserve", method="POST", payload=reserve_payload
    )
    if status != 200:
        print(f"FAIL: POST /api/stock/reserve returned {status}: {reserved}")
        return 1

    status, stock_after_reserve = request_json(f"{base_url}/api/stock?slug={slug}")
    if status != 200:
        print(f"FAIL: GET /api/stock (after reserve) returned {status}: {stock_after_reserve}")
        return 1

    qty_after = stock_after_reserve.get("sizes", {}).get(selected_size)
    if not isinstance(qty_after, int):
        print(f"FAIL: /api/stock after reserve missing size {selected_size}: {stock_after_reserve}")
        return 1

    release_payload = {
        "slug": slug,
        "size": selected_size,
        "quantity": 1,
        "reference": "smoke-test",
    }

    status, released = request_json(
        f"{base_url}/api/stock/release", method="POST", payload=release_payload
    )
    if status != 200:
        print(f"FAIL: POST /api/stock/release returned {status}: {released}")
        return 1

    status, stock_after_release = request_json(f"{base_url}/api/stock?slug={slug}")
    if status != 200:
        print(f"FAIL: GET /api/stock (after release) returned {status}: {stock_after_release}")
        return 1

    qty_final = stock_after_release.get("sizes", {}).get(selected_size)
    if not isinstance(qty_final, int):
        print(f"FAIL: /api/stock after release missing size {selected_size}: {stock_after_release}")
        return 1

    print("OK: stock reserve/release cycle")
    print(f"- slug: {slug}")
    print(f"- size: {selected_size}")
    print(f"- available before: {sizes[selected_size]}")
    print(f"- available after reserve: {qty_after}")
    print(f"- available after release: {qty_final}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
