from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def process_user_message(user_message, web_name):
    return f"{user_message} on the website {web_name}."

@app.route('/input', methods=['POST'])
def get_input():
    data = request.get_json()
    user_message = data.get('user_message')
    web_name = data.get('web_name') 

    print(f"Received user_message: {user_message}")
    print(f"Received web_name: {web_name}")

    # Process the data and return a response
    if user_message and web_name:
        processed_message = process_user_message(user_message, web_name)
        return jsonify({"message": processed_message})
    else:
        return jsonify({"error": "Missing user_message or web_name in request."}), 400

if __name__ == '__main__':
    app.run(debug=True)