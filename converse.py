import boto3
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv

from flask import Flask, request, jsonify

app = Flask(__name__)

def process_user_message(user_message):
    return f"Processed message: {user_message}"

@app.route('/input', methods=['POST'])
def get_input():
    user_message = request.json.get('user_message')
    processed_message = process_user_message(user_message)
    return jsonify({"message": "Input recieved", "processed_message": processed_message})

if __name__ == '__main__':
    app.run(debug=True)

load_dotenv()

# Put your AWS credentials in a .env file
access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")

client = boto3.client(
    service_name="bedrock-runtime",
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key,
    region_name="us-west-2",
)

# The model ID for the model you want to use
model_id = "us.meta.llama3-2-3b-instruct-v1:0"

conversation = [
    {
        "role": "user",
        "content": [{"text": user_message}],
    }
]

try:
    streaming_response = client.converse_stream(
        modelId=model_id,
        messages=conversation,
        inferenceConfig={"maxTokens": 512, "temperature": 0.5, "topP": 0.9},
    )

    # Extract and print the streamed response text in real-time.
    for chunk in streaming_response["stream"]:
        if "contentBlockDelta" in chunk:
            text = chunk["contentBlockDelta"]["delta"]["text"]
            print(text, end="")

except (ClientError, Exception) as e:
    print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
    exit(1)
