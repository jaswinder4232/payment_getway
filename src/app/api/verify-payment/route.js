import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        // Create signature for verification
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        // Verify signature
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment is verified
            console.log('Payment verified successfully:', {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
            });

            // TODO: Update database, send confirmation email, etc.

            return NextResponse.json({
                success: true,
                message: 'Payment verified successfully',
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
            });
        } else {
            // Invalid signature
            console.error('Payment verification failed: Invalid signature');
            return NextResponse.json(
                { success: false, error: 'Payment verification failed' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { success: false, error: 'Error verifying payment' },
            { status: 500 }
        );
    }
}
