from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Sample data
products = [
    {"id": 1, "name": "Nike Air Max", "price": 150},
    {"id": 2, "name": "Nike Air Force 1", "price": 120},
]


@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(products)


@app.route("/api/products", methods=["POST"])
def add_product():
    new_product = request.json
    new_product["id"] = len(products) + 1
    products.append(new_product)
    return jsonify(new_product), 201


if __name__ == "__main__":
    app.run(debug=True, port=3500, host="localhost")
