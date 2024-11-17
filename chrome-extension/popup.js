document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("userInput"); // Reference to the input field
  const submitButton = document.getElementById("submitButton"); // Reference to the button

  submitButton.addEventListener("click", function () {
    const userValue = userInput.value; // Use a new variable to store the value

    alert("Skibidi Sigma Mog Rizzler: " + userValue);

    userInput.value = ""; // Clear the input field
  });
});

