(function injectJS() {
  try {
    var iFrameHead = window.frames["ymIframe"].document.getElementsByTagName("head")[0];
    var modularBars = document.createElement('script');
    modularBars.type = 'text/javascript';
    modularBars.src = 'https://aporve.github.io/baf/assets/js/childiframe.js';
    iFrameHead.appendChild(modularBars);
  } catch (e) {
    console.error("failed while inserting to iFrame", e);
  }
})();


window.addEventListener('message', function (eventData) {
  try {
    let parsedData = JSON.parse(eventData.data)

    if (parsedData?.event_code == 'custom-parenttoroot-recent-order-event') {
      console.log("\n\n\n <--- Submited Details ---> \n\n\n", parsedData);
      window.frames.ymIframe.chat.send({
        event: {
          code: "submit_details",
          data: parsedData
        }
      }, true);
      return;
    }

  } catch (error) {
    console.error(error);
    return;
  }
}, false);
