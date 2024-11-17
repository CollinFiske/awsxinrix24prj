from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/extension_endpoint', methods=['POST'])
def extension_endpoint():
    data = request.json
    print("Received response from AI:", data['response'])
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(port=5001)