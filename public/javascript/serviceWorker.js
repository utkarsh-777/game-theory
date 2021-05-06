console.log('service worker loaded');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('push received...');
    self.registration.showNotification(data.title,{
        body:'notified by utkarsh',
        icon:'https://res.cloudinary.com/dg5o9ga4k/image/upload/v1619869082/push-notifications/s5momh5rhghyg8pjwupy.png'
    });
});
