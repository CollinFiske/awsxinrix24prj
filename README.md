# Acess AWS services + Simple Bedrock Tutorial

This repo demonstrates how to get started with AWS services and how to make a basic call to Bedrock in Python

## 1) AWS Management Console
Before jumping into the code, we first need to make a new user. AWS typically has a root user that gives out permissions, with other users that run specifc services. Because the hackathon is so short, we're only going to create 1 user and give that one all the permissions you need

### 1a) Creating the User
- Navigate to the home page of the AWS console account you were given
- In the search bar, type `IAM` (Identity and Access Management) and click on that service, it has a red icon
- Click on `Users` under the IAM Resources window
- You should see your root user, which will have a bunch of Access denied text over it. Ignore that and click the orange `Create user` button in the top right
- Give it a name, whatever you think is best
  - You do NOT need to give it access to the AWS console, as the root user can already do that
- In the permission options, click the `Attach policies directly` box
  - If you create more users, you can copy permissions, but do NOT copy from the root
- There are many permission policies, but I would recommend searching the service you want to use, then `FullAccess` after it
  - Ex: bedrockFullAccess, click the full access permission
  - You can add policies later if you find out you missed one
  - I would recommend Bedrock, SageMaker, EC2, and S3 Full Access to start
- The next page will have a summary of your account, feel free to screenshot this if you need to

### 1b) Creating an Access Key
This will allow us to use AWS services in our code

- When you create the user, a green banner should appear at the top. Click `View user` or click on the User's name in the Users box
- This page is where you can add permissions later if necessary, but we need to create an Access Key. In the `Summary` box, there should be a `Create access key` link on the right side
- It will ask you for a use case, select the `Local code` option. Ignore the suggestion it gives you and check the conformation box
  - It techincally doesn't matter what you put here, it's just for identifing the key later
- The description is optional, so leave it blank and click `Create access key`
- This gives you an access key and a secret. Copy both of these in a place you won't lose them
  - THE SECRET CAN NEVER BE VIEWED AGAIN ONCE YOU CLOSE THIS SCREEN
  - If you lose it, just create another key
- NOTE: These are extremely sensitive keys! Do NOT push these codes to GitHub and share them with your team via Slack DM, Discord, etc.

### 1c) Enabling AWS Bedrock Models
- In the search bar, type `Bedrock` and click on that service, it has a green icon
- Feel free to click through the different models, determining what would be best for your use case
- Once you have your selection(s), click the orange `Request model access` button on the main page of one of the models
- Click the orange `Modify model access` button
- Check the models you want to enable for your account. There is no limit on this and you can select any models that say `Avaliable to request`
- Click `Next` at the bottom once you have made your selections
- Review the selections and hit `Submit`
- You can test he models you pick by going to the `Playground` tab on the left side to test parameters such as temperature, topP, etc.

## 2) Setting up your Python environment
First, we need to create a virtual environment for Python, which essentially installs your packages to 1 project instead of globally

### 2a) Installing the required packages
- Create a virtual environment by running the following in the terminal directory of your project
  - Windows: `py -m venv venv`
  - Mac/Linux: `python3 -m venv venv`
- Then, you need to actually use the environment, so type the following
  - Windows: `venv\Scripts\activate.bat` or `venv\Scripts\Activate.ps1`
  - Mac/Linux: `source ./venv/bin/activate`
- Your terminal should have (venv) at the beginning of it now! Also set your VSCode interpreter to the venv path in the bottom right
- I have made a requirements.txt to install all of the packages you will need, so run the following to install them
  - Windows: `pip install -r requirements.txt`
  - Mac/Linux: `pip3 install -r requirements.txt`

### 2b) Putting the AWS credentials in the right place
- In order to not push your keys to GitHub, we need to put them in a `.env` file
- Open that file and replace `YOUR_ACCESS_KEY` and `YOUR_SECRET_KEY` with the ones you copied earlier
- Go to the `.gitignore` file and uncomment (remove the #) from line 4 that says .env
  - A gitignore files tells git to not push certain files and keep them local to computer
- Now you are ready to call AWS services!

## 3) Using the Python files 
There are 2 files I have made for you: `bedrock.py` and `converse.py`. Both call Amazon Bedrock, using the model you enabled and specify, to generate a response to a given prompt.
- Change `model_id` to the model you selected on the AWS console
- Change `user_message` to the prompt you want to use
- Change the `inferenceConfig` if you want to specifiy temperature, topP, etc.
- Run the file you changed with the following
  - Windows: `py bedrock.py` or `py converse.py`
  - Mac/Linux: `python3 bedrock.py` or `python3 converse.py`
- You should see the response in the console!
  - `bedrock.py` may take a long time depending on the prompt, as it waits for the entire response to complete
  - `converse.py` acts more like ChatGPT, where it generates the response in real-time!