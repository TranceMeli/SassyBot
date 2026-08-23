import os

from flask import Flask, request, jsonify, send_from_directory

from gemini_service import get_sassy_response


def create_app():
    app = Flask(__name__, static_folder="static", static_url_path="")

    @app.route("/api/chat", methods=["POST"])
    def chat():
        data = request.get_json(silent=True) or {}
        user_message = data.get("message", "").strip()
        reply = get_sassy_response(user_message)
        return jsonify({"response": reply})

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_react(path):
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    return app