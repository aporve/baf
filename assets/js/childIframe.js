window.addEventListener('message', function (eventData) {
  let parsedEventData = JSON.parse(eventData.data);

  if (parsedEventData.event_code === "custom-recent-order-event") {
    console.log('data childIframe', parsedEventData.data)
    parent.postMessage(JSON.stringify({
      event_code: 'custom-parenttoroot-recent-order-event',
      data: parsedEventData.data
    }), '*');
  }


  if (parsedEventData.event_code === "testEvent" && parsedEventData.data) {
    console.log('cloud data---->', parsedEventData.data)
    document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({
      event_code: 'testEvent',
      data: parsedEventData.data
    }), '*');
  }

});