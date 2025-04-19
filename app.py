from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for all routes

@app.route('/meili-webhook', methods=['POST'])
def meili_webhook():
    data = request.json

    if not data:
        return jsonify({"error": "No JSON payload received"}), 400

    # Debug log (optional)
    print("Received payload:", data)

    # Simulate forwarding to Make/Zapier or just return success for now
    return jsonify({"message": "Payload received", "task_id": data.get("task_id")}), 200

if __name__ == '__main__':
    app.run()
