chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req.searchTitle);

  if (req.action === "downloads") {
    for (let i = 0; i < req.data.length; i++) {
      var filename = `${req.searchTitle}_${i}`;
      var url = req.data[i].src;
      chrome.downloads.download({ url: url, saveAs: true, filename: filename });
    }

    sendResponse("Done");
  }
});
