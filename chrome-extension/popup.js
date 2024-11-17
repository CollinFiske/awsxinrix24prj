let currentUrl = '';

// When the popup is opened, get the current tab URL
document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Get the URL of the current active tab
    currentUrl = tabs[0].url;
    console.log("Current URL: ", currentUrl); // Log the current URL for debugging
  });

  const inputField = document.getElementById("userInput");
  const submitButton = document.getElementById("submitButton");
  const outputParagraph = document.getElementById("output");
  const userForm = document.getElementById("userForm");

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

  submitButton.addEventListener("click", function () {
    const userInput = inputField.value;

    // Save the user input and current URL
    saveUserInput(userInput, currentUrl);
<<<<<<< Updated upstream
    // Alert for debugging
    if (savedInput) {
      outputParagraph.textContent = "Processing...";
      outputParagraph.classList.remove("hidden");

      // Send input to Flask backend
      fetch("http://127.0.0.1:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: savedInput }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            outputParagraph.textContent = "Response: " + data.response;
          } else {
            outputParagraph.textContent = "Error: " + data.error;
          }
        })
        .catch((error) => {
          outputParagraph.textContent = "Error sending data to Flask: " + error;
        });
    } else {
      outputParagraph.classList.add("hidden");
    }
=======

>>>>>>> Stashed changes
    // Send the input and URL to Flask (adjusting for the new field names)
    fetch("http://127.0.0.1:5000/input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_message: userInput, web_name: currentUrl }), // Ensure both keys match Flask
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from Flask:", data);
        alert("Flask Response: " + (data.message || data.error)); // Handle both success and error responses
      })
      .catch((error) => {
        console.error("Error sending data to Flask:", error);
      });

    inputField.value = ""; // Clear the input field
  });
});

function saveUserInput(input, url) {
  window.userInput = input;
  window.currentUrl = url;
  console.log("User Input: ", window.userInput);
  console.log("Current URL: ", window.currentUrl);
  return { input: window.userInput, url: window.currentUrl };
}