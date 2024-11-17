let currentUrl = ''; // To store the current tab's URL

// When the popup is opened, get the current tab URL
document.addEventListener("DOMContentLoaded", function () {
  // Get the URL of the current active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentUrl = tabs[0].url;
    console.log("Current URL: ", currentUrl); // Log the current URL for debugging
  });

  const inputField = document.getElementById("userInput");
  const submitButton = document.getElementById("submitButton");
  const outputParagraph = document.getElementById("output");
<<<<<<< HEAD
  
  // Event listener for form submission
=======

>>>>>>> 6f8bb0632692e31f6bc3b167eb5c59c61dafe1fe
  submitButton.addEventListener("click", function () {
    const userInput = inputField.value;

<<<<<<< HEAD
    if (userInput && currentUrl) {
      outputParagraph.textContent = "Processing...";
      outputParagraph.classList.remove("hidden");

      // Save the user input and current URL
      const savedInput = saveUserInput(userInput, currentUrl);

      // Send the input and URL to Flask backend
      fetch("http://127.0.0.1:5000/input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_message: savedInput.input, web_name: savedInput.url }), // Send both user_input and url
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            outputParagraph.textContent = "Flask Response: " + data.message;
          } else {
            outputParagraph.textContent = "Error: " + data.error;
          }
        })
        .catch((error) => {
          outputParagraph.textContent = "Error sending data to Flask: " + error;
        });

      inputField.value = ""; // Clear the input field after sending the request
=======
    // Alert for debugging
    if (savedInput) {
      outputParagraph.textContent = "Saved User Input: " + savedInput;
      outputParagraph.classList.remove("hidden");
>>>>>>> 6f8bb0632692e31f6bc3b167eb5c59c61dafe1fe
    } else {
      outputParagraph.textContent = "Please enter a message and ensure the URL is valid.";
    }
<<<<<<< HEAD
  });

  // Function to save the user input and current URL
  function saveUserInput(input, url) {
    window.userInput = input;
    window.currentUrl = url;
    console.log("User Input: ", window.userInput);
    console.log("Current URL: ", window.currentUrl);
    return { input: window.userInput, url: window.currentUrl };
  }
});
=======

    // **New feature: Retrieve the current URL from the background script**
    chrome.runtime.sendMessage({ action: "getCurrentUrl" }, (response) => {
      if (response.status === "success") {
        const currentUrl = response.url; // Current page URL
        // **Updated feature: Include the URL in the POST request to Flask**
        fetch("http://127.0.0.1:5000/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: savedInput, url: currentUrl }), // Include URL
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Response from Flask:", data);
          })
          .catch((error) => {
            console.error("Error sending data to Flask:", error);
          });
      } else {
        console.error("Failed to retrieve URL."); // Error handling if URL retrieval fails
      }
    });

    // Clear input field after submission
    inputField.value = "";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const urlDisplay = document.getElementById("urlDisplay");

  // Automatically request the URL from the background script
  chrome.runtime.sendMessage({ action: "getCurrentUrl" }, (response) => {
    if (response.status === "success") {
      urlDisplay.textContent = `Current URL: ${response.url}`;
      urlDisplay.classList.remove("hidden");
    } else {
      urlDisplay.textContent = "Failed to retrieve URL.";
      urlDisplay.classList.remove("hidden");
    }
  });
});
>>>>>>> 6f8bb0632692e31f6bc3b167eb5c59c61dafe1fe
