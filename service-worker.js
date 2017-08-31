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
          action: 'i-dont-watch-porn',
          title: 'I don\'t watch porn :('
        },
        {
          action: 'watch-the-porn',
          title: 'WATCH NOW !',
        }
      ]
    };
    return self.registration.showNotification(receivedData.title, options);
  }

}

self.addEventListener('notificationclick', function(event){
  if(!event.action){
    // normal notification, without actions defined, just redirect to url passed
    return;
  }

  switch (event.action) {
    case 'watch-the-porn':
      clients.openWindow('https://www.youtube.com/watch?v=e3B3OAEiYF8');
      break;
    case 'i-dont-watch-porn':
      break;
    default:
      // console.log(`Unknown action clicked: '${event.action}'`);
      break;
  }
  event.notification.close();
})