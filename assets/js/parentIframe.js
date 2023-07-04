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
      window.frames.ymIframe.chat.send({
        event: {
          code: "submit_details",
          data: parsedData
        }
      }, true);
      return;
    }

    if (parsedData?.event_code == 'custom-parenttoroot-select-option-1') {
      window.frames.ymIframe.chat.send({
        event: {
          code: "pilihMerk",
          data: parsedData
        }
      }, true);
      return;
    }

    if (parsedData?.event_code == 'harga') {
      window.frames.ymIframe.chat.send({
        event: {
          code: "harga",
          data: parsedData
        }
      }, true);
      return;
    }

    if (parsedData?.event_code == 'elektronik_submit') {
      window.frames.ymIframe.chat.send({
        event: {
          code: "elektronik_submit",
          data: parsedData
        }
      }, true);
      return;
    }

    if (parsedData?.event_code == 'ele_nextForm') {
      window.frames.ymIframe.chat.send({
        event: {
          code: "ele_nextForm",
          data: parsedData
        }
      }, true);
      return;
    }


    if (parsedData?.event_code == 'custom-event' && parsedData?.data?.code == "testEvent") {
      document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
        event_code: 'custom-parent-client-event',
        data: parsedData.data.data
      }), '*');
      return;
    }

    if (parsedData?.event_code == 'custom-event' && parsedData?.data?.code == "pilihMerk") {
      document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
        event_code: 'pilihMerk',
        data: parsedData.data.data
      }), '*');
      return;
    }

    // jangkaWaktu

    if (parsedData?.event_code == 'custom-event' && parsedData?.data?.code == "jangkaWaktu") {
      document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
        event_code: 'jangkaWaktu-parentIframe',
        data: parsedData.data.data
      }), '*');
      return;
    }

    if (parsedData?.event_code == 'custom-event' && parsedData?.data?.code == "hitungAnda") {
      console.log('1-2---->')
      document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
        event_code: 'hitungAnda_parentIframe',
        data: parsedData.data.data
      }), '*');
      return;
    }

    if (parsedData?.event_code == 'custom-event' && parsedData?.data?.code == "submitLeads") {
      document.getElementById('ymIframe').contentWindow.postMessage(JSON.stringify({
        event_code: 'submitLeads_parentIframe',
        data: parsedData.data.data
      }), '*');
      return;
    }



  } catch (error) {
    console.error(error);
    return;
  }
}, false);
