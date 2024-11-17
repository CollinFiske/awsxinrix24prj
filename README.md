## Inspiration
The need for seamless, AI-powered assistance while browsing the web without switching between multiple tabs or applications.
## What it does
A Chrome extension that leverages Claude 3 Sonnet through AWS Bedrock to analyze web pages and answer questions in real-time, providing AI assistance directly within the browser.
## How we built it
Built using Chrome's Extension Manifest V3, JavaScript for frontend and background services, and AWS Bedrock API integration for accessing Claude's capabilities through a clean popup interface.
## Challenges We ran into
Implementing secure AWS authentication and managing the complex state between the popup, background service worker, and content scripts while maintaining a smooth user experience.
## Accomplishments that we're proud of
Successfully created a seamless integration between Chrome's extension framework and AWS Bedrock's powerful AI capabilities while maintaining a simple, user-friendly interface.
## What we learned
Gained deep insights into Chrome's Extension API architecture, AWS Bedrock integration, and the complexities of building secure, scalable AI-powered browser extensions.
## What's next for AskRon
Planning to add context menu integration, custom styling options, conversation history, and support for more specialized use cases like research assistance and content summarization.