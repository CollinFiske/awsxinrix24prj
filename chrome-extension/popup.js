document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("userInput");
  const submitButton = document.getElementById("submitButton");
  const outputParagraph = document.getElementById("output");

  // Get the current tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;

    submitButton.addEventListener("click", function () {
      const userInput = inputField.value;

      if (userInput && currentUrl) {
        outputParagraph.textContent = "Processing...";
        outputParagraph.classList.remove("hidden");

        const savedInput = {
          input: userInput,
          url: currentUrl
        };

        console.log("Sending data to Flask:", savedInput);

        fetch("http://127.0.0.1:5000/converse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_message: savedInput.input, web_name: savedInput.url }),
        })
          .then((response) => {
            console.log("Received response:", response);
            return response.json();
          })
          .then((data) => {
            console.log("Received data:", data);
            if (data.message) {
              outputParagraph.textContent = "Flask Response: " + data.message;
            } else {
              outputParagraph.textContent = "Error: " + data.error;
            }
          })
          .catch((error) => {
            console.error("Error sending data to Flask:", error);
            outputParagraph.textContent = "Error sending data to Flask: " + error;
          });
      } else {
        console.warn("User input or current URL is missing");
      }
    });
  });
});