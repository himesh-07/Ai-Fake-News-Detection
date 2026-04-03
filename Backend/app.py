from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route('/')
def home():
    return "Fake News API Running 🚀"

@app.route('/predict', methods=['POST'])
def predict():
    text = request.json['text']
    
    vec = vectorizer.transform([text])
    pred = model.predict(vec)[0]

    result = "Real News" if pred == 1 else "Fake News"
    
    return jsonify({"prediction": result})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)