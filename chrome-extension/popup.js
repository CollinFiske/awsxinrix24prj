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
        console.log("Response from Flask:", data);
      })
      .catch((error) => {
        console.error("Error sending data to Flask:", error);
      });

    // Clear input field after submission
    inputField.value = "";
  });
});
