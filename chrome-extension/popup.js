let userInput = "";

document.getElementById("submitButton").addEventListener("click", () => {
  userInput = document.getElementById("userInput").value;

  console.log("User Input ", userInput);

  
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
