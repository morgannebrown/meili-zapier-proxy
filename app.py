from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/22554641/2x4wdvm/"

@app.route("/")
def status():
    return jsonify({"message": "Proxy is live.", "status": "online"})

@app.route("/meili-webhook", methods=["POST"])
def proxy():
    payload = request.json
    try:
        r = requests.post(ZAPIER_WEBHOOK, json=payload)
        return jsonify({"status": "forwarded", "zapier_response": r.status_code}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
