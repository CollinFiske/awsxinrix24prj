document.getElementById("fetchData").addEventListener("click", () => {
  fetch("http://localhost:5000/api/data")
    .then(response => response.json())
    .then(data => {
      document.getElementById("response").textContent = data.message;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
});

document.getElementById("submitButton").addEventListener("click", () => {
  const userInput = document.getElementById("userInput").value;

  if (userInput) {
    // send input to flask 
    fetch('http://localhost:5000/save-input', {
      method: 'POST', headers: {
        'Content-type' : 'aplication/json'
      },
      body: JSON.stringify({ input: userInput})
    })
    .then(response => response.json())
    .then(data => {
      console.log("Input saved: ", data)
    })
    .catch(error => {
      console.error("Error saving input:", error);
    });
  } else {
    console.log("No input provided.");
  }
});

document.getElementById("extract").addEventListener("click", () => {
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
