var images = [];
var title = "";

function getSearchTitle(url) {
  var s = url.search("q=");
  var e = url.search("&");
  console.log(url.substring(s+2, e));
  return url.substring(s+2, e);
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  title = getSearchTitle(tabs[0].url);

  chrome.tabs.sendMessage(tabs[0].id, { action: "get_images" }, (response) => {
    console.log("res: ", response);

    $("div.gallery").html("");

    images = response;
    if (response !== undefined) {
      response.map((img) => {
        // console.log(`<img src="` + img.src + `" alt="404"/>`);
        $("div.gallery").append(`<img src="` + img.src + `" alt="404">`);
      });
    } else console.log("No response");
  });
});

$(document).on("click", "#download_all", (e) => {
  console.log("Downloading all ...");
  chrome.runtime.sendMessage({ action: "downloads", data: images, searchTitle: title }, (res) => {
    console.log("Download complete!");
  });
});
