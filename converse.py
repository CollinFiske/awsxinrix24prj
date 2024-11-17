from flask import Flask, request, jsonify
import os
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv

app = Flask(__name__)

def process_user_message(user_message, web_name):
    returnVal = """
    
    When responding, provide a direct URL if it can take the user to the relevant page on the website. If no such URL exists, give a detailed explanation of how to find the information on the site. 
    Do not use quotation marks around URLs or website names.

    Example 1:
    **Input Question**: "The question is: How do I find the academic calendar? website: https://www.universityexample.edu](https://www.universityexample.edu"
    **Output**: "You can find the academic calendar at https://www.universityexample.edu/academic-calendar](https://www.universityexample.edu/academic-calendar"

    Example 2:
    **Input Question**: "The question is: How do I change my password? website: https://www.serviceexample.com](https://www.serviceexample.com"
    **Output**: "Navigate to 'Account Settings' by clicking your profile icon in the top-right corner, then select 'Security' and follow the instructions to change your password. Unfortunately, there is no direct URL to this page."

    Example 3:
    **Input Question**: "The question is: How do I find the spaghetti page? website: https://www.apple.com
    **Output**: "I could not find this webpage, please ask another question!"

    Now, answer the question:
    """ + "The question is: " + user_message + " website: " + web_name


    return returnVal

@app.route('/converse', methods=['POST'])
def get_input():
    data = request.get_json()
    user_message = data.get('user_message')
    web_name = data.get('web_name')

    # Print the input values to the console for debugging
    print(f"Received user_message: {user_message}")
    print(f"Received web_name: {web_name}")

    # Check if either user_message or web_name is missing
    if not user_message or not web_name:
        return jsonify({"error": "Missing user_message or web_name"}), 400

    # Process the data (example: just echoing the received message)
    processed_message = process_user_message(user_message, web_name)

    conversation = [
        {
            "content": [{"text": processed_message}],
        }
    ]

    try:
        streaming_response = client.converse_stream(
            modelId=model_id,
            messages=conversation,
            inferenceConfig={"maxTokens": 512, "temperature": 0.6, "topP": 0.6},
        )

        # Extract and build the streamed response text in real-time
        response_text = ""
        for chunk in streaming_response.get("stream", []):
            if "contentBlockDelta" in chunk:
                response_text += chunk["contentBlockDelta"]["delta"]["text"]

        return jsonify({"message": "Input received", "processed_message": processed_message, "response": response_text})

    except (Exception) as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
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

    app.run(debug=True)