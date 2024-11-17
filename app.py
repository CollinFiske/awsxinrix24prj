from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow communication from the extension

@app.route('/')
def index():
    return render_template('index.html')

# Route to receive user input
@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json  # Parse JSON data from the request
    user_input = data.get('prompt')  # Extract the 'prompt' field
    print(f"Received from Chrome Extension: {user_input}")
    return jsonify({"message": "Data received", "received_prompt": user_input})

if __name__ == '__main__':
    app.run(debug=True)