from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = pickle.load(open(os.path.join(BASE_DIR, "model.pkl"), "rb"))
vectorizer = pickle.load(open(os.path.join(BASE_DIR, "vectorizer.pkl"), "rb"))

@app.route("/", methods=["GET"])
def home():
    return "Fake News API Running 🚀"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        if not data or "text" not in data or not data["text"].strip():
            return jsonify({"error": "No text provided"}), 400

        text = data["text"]
        vec = vectorizer.transform([text])
        pred = model.predict(vec)[0]
        result = "Real News" if pred == 1 else "Fake News"
        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
