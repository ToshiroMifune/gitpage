/**
 * Created by dementor on 2017-08-31.
 */

self.addEventListener('push', function(event){
  const promiseChain = handlePush(event);
  event.waitUntil(promiseChain);
});

function handlePush(event) {
  if (event.data) {
    const receivedData = event.data.json();

    const options = {
      body: receivedData.message,
      icon: receivedData.icon,
      image: 'img/testpushimage.jpg',
      dir: 'auto',
      actions: [
        {
          action: 'watch',
          title: 'WATCH!',
        },
        {
          action: 'no-thank',
          title: 'No thanks'
        }
      ]
    };
    return self.registration.showNotification(receivedData.title, options);
  }
}

self.addEventListener('notificationclick', function(event){
  const receivedData = event.data.json();
  if(!event.action){
    // normal notification, without actions defined, just redirect to url passed
    clients.openWindow(receivedData.url);
    return;
  }

  switch (event.action) {
    case 'watch':
      clients.openWindow(receivedData.url);
      break;
    case 'no-thanks':
      break;
    default:
      // console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
  event.notification.close();
})