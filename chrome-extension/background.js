

chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome extension installed");
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getCurrentUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = tabs[0]?.url;
      if (currentUrl) {
        console.log("Current Page URL:", currentUrl);

        // Save the URL in Chrome storage
        chrome.storage.local.set({ currentPageUrl: currentUrl }, () => {
          console.log("URL saved to storage:", currentUrl);
          sendResponse({ url: currentUrl, status: "success" });
        });
      } else {
        console.error("No active tab found.");
        sendResponse({ url: null, status: "failed" });
      }
    });
    return true; // Keep the message channel open for async response
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "response") {
    chrome.runtime.sendMessage({ type: "response", data: message.data });
  }
});
