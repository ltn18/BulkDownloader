chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "get_images") {
    let formatted_images = [];

    $("div.mJxzWe").find("img").map((i, img) => {
      if ($(img).data("src")) {
        formatted_images.push({
          src: $(img).data("src"),
        });
      } else if ($(img).src) {
        formatted_images.push({
          src: $(img).src,
        });
      }
    });

    sendResponse(formatted_images);
  }
});
