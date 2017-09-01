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
      requireInteraction: true,
      actions: [
        {
          action: 'watch',
          title: 'WATCH NOW!'
        },
        {
          action: 'no-thanks',
          title: 'I dont watch porn :('
        }
      ],
      passedData: receivedData
    };
    return self.registration.showNotification(receivedData.title, options);
  }
}

self.addEventListener('notificationclick', function(event){
  const receivedData = event.notification;
  if(!event.action){
    // normal notification, without actions defined, just redirect to url passed
    return;
  }

  switch (event.action) {
    case 'watch':
      clients.openWindow('https://www.youtube.com/watch?v=p5PVPoN3gyg');
      break;
    case 'no-thanks':
      break;
    default:
      console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
  event.notification.close();
})