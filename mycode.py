from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/weather", methods=["POST"])
def weather():
    data = request.json
    location = data["location"]
    unit = data["unit"]
    api_key = "10edcbfc4e9a5af44bc9a2bf1071b7b5"
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&units={unit}&appid={api_key}"
    response = requests.get(url)
    weather_data = response.json()
    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True)