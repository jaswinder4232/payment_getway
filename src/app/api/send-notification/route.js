import { NextResponse } from 'next/server';
import webpush from 'web-push';

// Configure web-push with VAPID keys
// Generate keys with: npx web-push generate-vapid-keys
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
        'mailto:your-email@example.com',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
}

export async function POST(request) {
    try {
        const { subscription, title, body, url } = await request.json();

        if (!subscription) {
            return NextResponse.json(
                { success: false, error: 'Subscription required' },
                { status: 400 }
            );
        }

        const payload = JSON.stringify({
            title: title || 'Premium App Notification',
            body: body || 'You have a new notification',
            url: url || '/',
        });

        // Send push notification
        await webpush.sendNotification(subscription, payload);

        return NextResponse.json({
            success: true,
            message: 'Notification sent successfully',
        });
    } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json(
            { success: false, error: 'Error sending notification' },
            { status: 500 }
        );
    }
}
