'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import Script from 'next/script';

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

    useEffect(() => {
        if (cart.length === 0) {
            router.push('/');
        }
    }, [cart, router]);

    const handlePayment = async () => {
        if (!razorpayLoaded) {
            alert('Payment gateway is loading. Please try again.');
            return;
        }

        setLoading(true);

        try {
            // Create order on backend
            const orderResponse = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: getCartTotal(),
                    currency: 'INR',
                    items: cart,
                }),
            });

            const orderData = await orderResponse.json();

            if (!orderData.orderId) {
                alert('Error creating order');
                setLoading(false);
                return;
            }

            // Razorpay checkout options
            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'StyleHub',
                description: `Order for ${cart.length} item(s)`,
                order_id: orderData.orderId,
                handler: async function (response) {
                    try {
                        const verifyResponse = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.success) {
                            // Clear cart and redirect to success
                            clearCart();
                            window.location.href = `/success?payment_id=${response.razorpay_payment_id}&items=${cart.length}`;
                        } else {
                            alert('Payment verification failed');
                            setLoading(false);
                        }
                    } catch (error) {
                        console.error('Verification error:', error);
                        alert('Error verifying payment');
                        setLoading(false);
                    }
                },
                prefill: {
                    name: '',
                    email: '',
                    contact: '',
                },
                method: {
                    emi: false,
                    paylater: false,
                },
                theme: {
                    color: '#667eea',
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        router.push('/cancel');
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return null;
    }

    return (
        <>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => setRazorpayLoaded(true)}
                onError={() => {
                    console.error('Failed to load Razorpay SDK');
                    alert('Failed to load payment gateway');
                }}
            />

            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center text-gray-400 hover:text-white transition-colors mb-4"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Shopping
                        </button>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Checkout
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="card">
                                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div
                                            key={`${item.id}-${item.size}-${item.color}`}
                                            className="flex gap-4 p-4 rounded-xl bg-white/5"
                                        >
                                            <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0 flex items-center justify-center">
                                                <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white">{item.name}</h3>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    Size: {item.size} | Color: {item.color}
                                                </p>
                                                <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-purple-400">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="lg:col-span-1">
                            <div className="card sticky top-4">
                                <h2 className="text-xl font-bold text-white mb-6">Payment Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span>₹{getCartTotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-green-400">FREE</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-3">
                                        <div className="flex justify-between text-xl font-bold">
                                            <span className="text-white">Total</span>
                                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                ₹{getCartTotal().toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={loading || !razorpayLoaded}
                                    className="btn-primary w-full text-lg py-4"
                                >
                                    {loading ? (
                                        <>
                                            Processing
                                            <span className="spinner"></span>
                                        </>
                                    ) : !razorpayLoaded ? (
                                        'Loading...'
                                    ) : (
                                        'Pay Now'
                                    )}
                                </button>

                                <div className="mt-4 text-center">
                                    <p className="text-xs text-gray-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Secure payment powered by Razorpay
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
