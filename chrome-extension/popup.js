function saveUserInput(input) {
  window.userInput = input; // Save input globally for debugging
  return window.userInput;
}

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("userInput");
  const submitButton = document.getElementById("submitButton");
  const outputParagraph = document.getElementById("output");
  const userForm = document.getElementById("userForm");

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

  submitButton.addEventListener("click", function () {
    const userInput = inputField.value; // Get user input
    const savedInput = saveUserInput(userInput); // Save input

<<<<<<< HEAD
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
=======
    // Alert for debugging
    alert("Saved User Input: " + savedInput);

    // Send input to Flask backend
    fetch("http://127.0.0.1:5000/api/data", {
>>>>>>> parent of f2b37ab (Get url and log for debugging)
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: savedInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from Flask:", data);
      })
      .catch((error) => {
        console.error("Error sending data to Flask:", error);
      });

    // Clear input field after submission
    inputField.value = "";
  });
});
