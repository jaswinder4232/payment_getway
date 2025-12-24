'use client';

import { useState, useEffect } from 'react';
import {
    subscribeToPushNotifications,
    requestNotificationPermission,
    sendTestNotification,
} from '../lib/pushNotifications';

export default function NotificationButton() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [permission, setPermission] = useState('default');

    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const handleEnableNotifications = async () => {
        const granted = await requestNotificationPermission();
        if (granted) {
            setPermission('granted');
            const subscription = await subscribeToPushNotifications();
            if (subscription) {
                setIsSubscribed(true);
                // Send a test notification
                await sendTestNotification();
            }
        } else {
            setPermission('denied');
        }
    };

    if (permission === 'denied') {
        return (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">
                    Notifications are blocked. Please enable them in your browser settings.
                </p>
            </div>
        );
    }

    if (isSubscribed) {
        return (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <p className="text-sm text-green-400 font-medium">Notifications enabled</p>
                </div>
                <button
                    onClick={sendTestNotification}
                    className="text-xs text-green-400 hover:text-green-300 underline"
                >
                    Test
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleEnableNotifications}
            className="mt-4 w-full p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg hover:border-purple-500/50 transition-all duration-300 flex items-center justify-center space-x-2"
        >
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="text-sm text-purple-300 font-medium">Enable Notifications</span>
        </button>
    );
}
