window.addEventListener('message', function (eventData) {
  let parsedEventData = JSON.parse(eventData.data);

  if (parsedEventData.event_code === "custom-recent-order-event") {
    parent.postMessage(JSON.stringify({
      event_code: 'custom-parenttoroot-recent-order-event',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "custom-select-option-1") {
    parent.postMessage(JSON.stringify({
      event_code: 'custom-parenttoroot-select-option-1',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "harga") {
    parent.postMessage(JSON.stringify({
      event_code: 'harga',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "elektronik_submit") {
    parent.postMessage(JSON.stringify({
      event_code: 'elektronik_submit',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "ele_nextForm") {
    parent.postMessage(JSON.stringify({
      event_code: 'ele_nextForm',
      data: parsedEventData.data
    }), '*');
  }


  if (parsedEventData.event_code === "custom-parent-client-event" && parsedEventData.data) {
    document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({
      event_code: 'custom-child-client-event',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "pilihMerk" && parsedEventData.data) {
    document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({
      event_code: 'pilihMerk',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "jangkaWaktu-parentIframe" && parsedEventData.data) {
    document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({
      event_code: 'jangkaWaktu-childIframe',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "hitungAnda_parentIframe" && parsedEventData.data) {
    document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({
      event_code: 'hitungAnda-childIframe',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "submitLeads_parentIframe" && parsedEventData.data) {
    document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({
      event_code: 'submitLeads-childIframe',
      data: parsedEventData.data
    }), '*');
  }

  //comment 
});