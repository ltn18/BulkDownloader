var images = [];

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
  chrome.runtime.sendMessage({ action: "downloads", data: images }, (res) => {
    console.log("Download complete!");
  });
});
