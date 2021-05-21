chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "downloads") {
    for (let i = 0; i < req.data.length; i++) {
      chrome.downloads.download({url: req.data[i].src})
    }

    sendResponse("Done");
  }
})