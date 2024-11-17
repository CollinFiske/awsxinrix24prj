function saveUserInput(input) {
  window.userInput = input; // Save input globally for debugging
  return window.userInput;
}

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("userInput");
  const submitButton = document.getElementById("submitButton");
  const outputParagraph = document.getElementById("output");

  submitButton.addEventListener("click", function () {
    const userInput = inputField.value; // Get user input
    const savedInput = saveUserInput(userInput); // Save input

    // Alert for debugging
    if (savedInput) {
      outputParagraph.textContent = "Saved User Input: " + savedInput;
      outputParagraph.classList.remove("hidden");
    } else {
      outputParagraph.classList.add("hidden");
    }

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
