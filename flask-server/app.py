# Backend (Flask) - app.py
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data
todos = [
    {"id": 1, "title": "Learn Flask", "completed": False},
    {"id": 2, "title": "Learn Next.js", "completed": False},
]


@app.route("/api/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)


@app.route("/api/todos", methods=["POST"])
def add_todo():
    new_todo = request.json
    new_todo["id"] = len(todos) + 1
    todos.append(new_todo)
    return jsonify(new_todo), 201


if __name__ == "__main__":
    app.run(debug=True, port=5000)
