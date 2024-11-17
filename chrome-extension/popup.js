document.addEventListener("DOMContentLoaded", function() {
  const userInput = document.getElementById("userInput");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function() {
    const userInput = userInput.value;

    alert("User Input: " + userInput);

    inputField.value = "";
  });
});

document.getElementById("extract").addEventListener("click", () => {
  console.log("Extracting??")
  // Inject and run the content script in the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found!");
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"]
    }, () => {
      console.log("Content script injected successfully.");
    });
  });
});
