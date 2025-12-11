'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get('payment_id');

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="card max-w-md w-full fade-in-up text-center">
                {/* Success Icon */}
                <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center animate-pulse">
                        <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Payment Successful!
                </h1>
                <p className="text-gray-400 mb-6">
                    Thank you for your purchase. Your payment has been processed successfully.
                </p>

                {/* Payment Info */}
                {paymentId && (
                    <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-sm text-gray-500 mb-1">Payment ID</p>
                        <p className="text-xs text-gray-400 font-mono break-all">{paymentId}</p>
                    </div>
                )}

                {/* What's Next */}
                <div className="mb-8 text-left">
                    <h2 className="text-xl font-semibold mb-4 text-white">What's next?</h2>
                    <div className="space-y-3">
                        {[
                            'Check your email for the receipt',
                            'Access your premium features',
                            'Contact support if you have questions',
                        ].map((item, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                                    {index + 1}
                                </span>
                                <span className="text-gray-300 pt-0.5">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link href="/" className="block">
                        <button className="btn-primary w-full">
                            Return to Home
                        </button>
                    </Link>
                    <p className="text-sm text-gray-500">
                        Need help?{' '}
                        <a href="mailto:support@example.com" className="text-purple-400 hover:text-purple-300">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
