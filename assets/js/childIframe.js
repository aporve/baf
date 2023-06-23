window.addEventListener('message', function (eventData) {
  let parsedEventData = JSON.parse(eventData.data);

  if (parsedEventData.event_code === "custom-recent-order-event") {
    console.log('data childIframe', parsedEventData.data)
    parent.postMessage(JSON.stringify({
      event_code: 'custom-parenttoroot-recent-order-event',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "custom-select-option-1") {
    console.log('data childIframe', parsedEventData.data)
    parent.postMessage(JSON.stringify({
      event_code: 'custom-parenttoroot-select-option-1',
      data: parsedEventData.data
    }), '*');
  }


  if (parsedEventData.event_code === "custom-parent-client-event" && parsedEventData.data) {
    console.log('cloud data---->', parsedEventData.data)
    document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({
      event_code: 'custom-child-client-event',
      data: parsedEventData.data
    }), '*');
  }

  if (parsedEventData.event_code === "pilihMerk" && parsedEventData.data) {
    console.log('pilihMerk childIframe---->', parsedEventData.data)
    document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({
      event_code: 'pilihMerk',
      data: parsedEventData.data
    }), '*');
  }

});