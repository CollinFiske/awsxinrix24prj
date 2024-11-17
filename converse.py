import boto3
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify

# Initialize Flask app
app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# AWS credentials from environment variables
access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")

# Set up the Boto3 client for AWS Bedrock
client = boto3.client(
    service_name="bedrock-runtime",
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key,
    region_name="us-west-2",  # Adjust the region as necessary
)

@app.route('/api/data', methods=['POST'])
def get_input():
    # Extract data from the incoming JSON request
    user_message = request.json.get('user_message')
    web_name = request.json.get('web_name')

    # Print the input values to the console for debugging
    print(f"Received user_message: {user_message}")
    print(f"Received web_name: {web_name}")

    # Check if either user_message or web_name is missing
    if not user_message or not web_name:
        return jsonify({"error": "Missing user_message or web_name"}), 400

    # Process the data (example: just echoing the received message)
    processed_message = f"Received message: {user_message} from {web_name}"

    # The model ID for the model you want to use (adjust the model ID accordingly)
    model_id = "us.meta.llama3-2-3b-instruct-v1:0"  # Change if necessary

    conversation = [
        {
            "content": [{"text": processed_message}],
        }
    ]

    try:
        # Request to Bedrock API for streaming conversation
        streaming_response = client.converse_stream(
            modelId=model_id,
            messages=conversation,
            inferenceConfig={"maxTokens": 512, "temperature": 0.5, "topP": 0.9},
        )

        # Extract and build the streamed response text in real-time
        response_text = ""
        for chunk in streaming_response.get("stream", []):
            if "contentBlockDelta" in chunk:
                response_text += chunk["contentBlockDelta"]["delta"]["text"]

        return jsonify({
            "message": "Input received",
            "processed_message": processed_message,
            "response": response_text
        })

    except ClientError as e:
        # Catch any AWS-related errors
        return jsonify({"error": f"AWS Client Error: {str(e)}"}), 500

    except Exception as e:
        # Catch all other exceptions
        return jsonify({"error": f"Error processing the request: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)