

chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome extension installed");
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Hello! I am here and i am gay");
  if (message.tableData) {
    console.log("Table Data Received:", message.tableData);

    const blob = new Blob([message.tableData], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: url,
      filename: "redirect_links_table.html"
    });
  }
});
