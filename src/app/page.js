'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert('Razorpay SDK is still loading. Please try again.');
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
          amount: 4999, // ₹4999
          currency: 'INR',
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
        name: 'Premium Subscription',
        description: 'Unlock all premium features',
        order_id: orderData.orderId,
        handler: async function (response) {
          // Verify payment on backend
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
              // Redirect to success page
              window.location.href = `/success?payment_id=${response.razorpay_payment_id}`;
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
          color: '#ff6600ff',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            window.location.href = '/cancel';
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

  return (
    <>
      {/* Load Razorpay SDK */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => {
          console.error('Failed to load Razorpay SDK');
          alert('Failed to load payment gateway');
        }}
      />

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card max-w-md w-full fade-in-up">
          {/* Product Image */}
          <div className="mb-6 text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
          </div>

          {/* Product Details */}
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Premium Subscription
          </h1>
          <p className="text-center text-gray-400 mb-6">
            Unlock all premium features and take your experience to the next level
          </p>

          {/* Features List */}
          <div className="space-y-3 mb-8">
            {[
              'Unlimited access to all features',
              'Priority customer support',
              'Advanced analytics dashboard',
              'Custom integrations',
              'Ad-free experience',
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div className="text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ₹4,999
              </span>
            </div>
            <p className="text-gray-400">One-time payment</p>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handlePayment}
            disabled={loading || !razorpayLoaded}
            className="btn-primary w-full"
          >
            {loading ? (
              <>
                Processing
                <span className="spinner"></span>
              </>
            ) : !razorpayLoaded ? (
              'Loading...'
            ) : (
              'Buy Now'
            )}
          </button>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
