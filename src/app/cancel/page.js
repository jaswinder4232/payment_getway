'use client';

import Link from 'next/link';

export default function CancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="card max-w-md w-full fade-in-up text-center">
                {/* Cancel Icon */}
                <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>

                {/* Cancel Message */}
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Payment Cancelled
                </h1>
                <p className="text-gray-400 mb-8">
                    Your payment was cancelled. No charges were made to your account.
                </p>

                {/* Reassurance */}
                <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-300">
                        Don't worry! You can try again whenever you're ready. Your cart is still waiting for you.
                    </p>
                </div>

                {/* Common Reasons */}
                <div className="mb-8 text-left">
                    <h2 className="text-xl font-semibold mb-4 text-white">Common reasons for cancellation:</h2>
                    <div className="space-y-2 text-gray-400 text-sm">
                        <div className="flex items-start space-x-2">
                            <span className="text-orange-400 mt-1">•</span>
                            <span>Changed your mind about the purchase</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="text-orange-400 mt-1">•</span>
                            <span>Need to update payment information</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="text-orange-400 mt-1">•</span>
                            <span>Want to review the details first</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link href="/" className="block">
                        <button className="btn-primary w-full">
                            Try Again
                        </button>
                    </Link>
                    <p className="text-sm text-gray-500">
                        Have questions?{' '}
                        <a href="mailto:support@example.com" className="text-purple-400 hover:text-purple-300">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
