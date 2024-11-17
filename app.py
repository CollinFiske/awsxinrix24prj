from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['POST'])
def receive_data():
    # Get the data sent by the extension
    data = request.json
    user_prompt = data.get('prompt')
    print(f"Received from Chrome Extension: {user_prompt}")
    # Return a response to the extension
    return jsonify({"message": "Data received successfully", "received_prompt": user_prompt})

if __name__ == '__main__':
    app.run(debug=True)