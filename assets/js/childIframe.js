window.addEventListener('message', function (eventData) {
  let parsedEventData = JSON.parse(eventData.data);

  if (parsedEventData.event_code === "custom-recent-order-event") {
    parent.postMessage(JSON.stringify({
      event_code: 'custom-parenttoroot-recent-order-event',
      data: parsedEventData.data
    }), '*');
  }

});