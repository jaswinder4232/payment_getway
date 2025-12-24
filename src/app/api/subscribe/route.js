import { NextResponse } from 'next/server';

// In a real app, store subscriptions in a database
// For now, we'll just log them
const subscriptions = new Set();

export async function POST(request) {
    try {
        const subscription = await request.json();

        // Store the subscription (in production, save to database)
        subscriptions.add(JSON.stringify(subscription));

        console.log('New push subscription:', subscription);
        console.log('Total subscriptions:', subscriptions.size);

        return NextResponse.json({
            success: true,
            message: 'Subscription saved successfully',
        });
    } catch (error) {
        console.error('Error saving subscription:', error);
        return NextResponse.json(
            { success: false, error: 'Error saving subscription' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        success: true,
        count: subscriptions.size,
    });
}
