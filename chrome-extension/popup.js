document.addEventListener("DOMContentLoaded", function() {
  const userInput = document.getElementById("userInput");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function() {
    const userInput = userInput.value;

    alert("User Input: " + userInput);

    inputField.value = "";
  });
});
