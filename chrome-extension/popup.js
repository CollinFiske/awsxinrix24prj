document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("userInput");
  const submitButton = document.getElementById("submitButton");
  const outputParagraph = document.getElementById("output");
  const userForm = document.getElementById("userForm");

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const userInput = inputField.value; // Get user input

    if (userInput) {
      outputParagraph.textContent = "Processing...";
      outputParagraph.classList.remove("hidden");

      // Get the current tab URL
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentUrl = tabs[0].url;
        const callbackUrl = "http://127.0.0.1:5000/callback"; // Replace with your actual callback URL

        // Send input to Flask backend
        fetch("http://127.0.0.1:5000/converse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_message: userInput,
            web_name: currentUrl,
            callback_url: callbackUrl
          }),
        })
          .then((response) => response.json())
          .then((data) => {
              console.log(data)
              outputParagraph.textContent = "Response: " + data.response;
          })
          .catch((error) => {
            outputParagraph.textContent = "Error sending data to Flask: " + error;
          });
      });
    } else {
      outputParagraph.classList.add("hidden");
    }

    // Clear input field after submission
    inputField.value = "";
  }

  submitButton.addEventListener("click", handleSubmit);
});