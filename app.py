from flask import Flask, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)

@app.route('/meili-webhook', methods=['POST', 'OPTIONS'])
@cross_origin(origin='*', headers=['Content-Type'])  # ✅ Explicit CORS route wrapper
def meili_webhook():
    if request.method == 'OPTIONS':
        # Handle CORS preflight
        response = app.make_default_options_response()
        headers = response.headers

        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Content-Type'
        headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'

        return response

    # Handle POST
    data = request.json
    if not data:
        return jsonify({"error": "No JSON payload received"}), 400

    print("Received payload:", data)
    return jsonify({"message": "Payload received", "task_id": data.get("task_id")}), 200

if __name__ == '__main__':
    app.run()
