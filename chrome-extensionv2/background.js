chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the status is 'complete' to ensure the page has finished loading
  if (changeInfo.status === 'complete' && tab.url) {
    // Execute the script using chrome.scripting.executeScript (in the right context)
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: collectData
    });
  }
});

// Function to collect links and text from the page
function collectData() {
  // Collect all links in the page
  const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
  
  // Collect the text content from important HTML tags (you can adjust this)
  const texts = Array.from(document.body.querySelectorAll('p, h1, h2, h3, span')).map(el => el.textContent);

  // Store the collected links and texts in local storage
  chrome.storage.local.set({ links, texts }, () => {
    console.log('Collected links and texts');
  });
}

