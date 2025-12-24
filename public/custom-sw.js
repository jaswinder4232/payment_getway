// public/sw.js - Custom Service Worker for Push Notifications

self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');

    let data = {};
    if (event.data) {
        data = event.data.json();
    }

    const title = data.title || 'Premium App Notification';
    const options = {
        body: data.body || 'You have a new notification',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: data.primaryKey || 1,
            url: data.url || '/',
        },
        actions: [
            {
                action: 'explore',
                title: 'View',
                icon: '/icon-192x192.png',
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icon-192x192.png',
            },
        ],
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    } else if (event.action === 'close') {
        event.notification.close();
    } else {
        event.waitUntil(
            clients.openWindow(event.notification.data.url)
        );
    }
});
