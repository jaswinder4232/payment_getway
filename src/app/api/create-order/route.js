import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
    try {
        const { amount, currency = 'INR' } = await request.json();

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects amount in smallest currency unit (paise for INR)
            currency: currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                description: 'Premium Subscription',
            },
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        return NextResponse.json(
            { error: 'Error creating order' },
            { status: 500 }
        );
    }
}
