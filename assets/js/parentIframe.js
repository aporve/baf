(function injectJS() {
  try {
    var iFrameHead = window.frames["ymIframe"].document.getElementsByTagName("head")[0];
    var modularBars = document.createElement('script');
    modularBars.type = 'text/javascript';
    modularBars.src = 'https://aporve.github.io/baf/assets/js/childIframe.js';
    iFrameHead.appendChild(modularBars);
  } catch (e) {
    console.error("failed while inserting to iFrame", e);
  }
})();


window.addEventListener('message', function (eventData) {
  try {
    let parsedData = JSON.parse(eventData.data)

    if (parsedData?.event_code == 'custom-parenttoroot-recent-order-event') {
      console.log("\n\n\n <--- Submited Details parent ---> \n\n\n", parsedData);
      window.frames.ymIframe.chat.send({
        event: {
          code: "submit_details",
          data: parsedData
        }
      }, true);
      return;
    }

    if (parsedData?.event_code == 'custom-parenttoroot-select-option-1') {
      console.log("\n\n\n <--- Submited Details parent ---> \n\n\n", parsedData);
      window.frames.ymIframe.chat.send({
        event: {
          code: "pilihMerk",
          data: parsedData
        }
      }, true);
      return;
    }


    if (parsedData?.event_code == 'custom-event' && parsedData?.data?.code == "testEvent") {
      console.log("\n\n\n <--- Aall data Parent  ---> \n\n\n", parsedData);
      document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
        event_code: 'custom-parent-client-event',
        data: parsedData.data.data
      }), '*');
      return;
    }

  } catch (error) {
    console.error(error);
    return;
  }
}, false);
