'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get('payment_id');
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated confetti particles */}
            {showConfetti && (
                <div className="confetti-container">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                backgroundColor: ['#667eea', '#764ba2', '#11998e', '#38ef7d', '#ee0979'][
                                    Math.floor(Math.random() * 5)
                                ],
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="card max-w-lg w-full text-center success-card">
                {/* Success Icon with enhanced animation */}
                <div className="mb-8">
                    <div className="success-icon-wrapper">
                        <div className="success-icon">
                            <svg
                                className="w-16 h-16 text-white checkmark-animation"
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
                        <div className="success-ring"></div>
                        <div className="success-ring-delayed"></div>
                    </div>
                </div>

                {/* Success Message with staggered animation */}
                <h1 className="text-5xl font-bold mb-6 success-title">
                    <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Payment Successful!
                    </span>
                </h1>

                <p className="text-lg text-gray-300 mb-10 success-subtitle leading-relaxed px-4">
                    Thank you for your purchase. Your payment has been processed successfully.
                </p>

                {/* Payment Info with slide-in animation */}
                {paymentId && (
                    <div className="mb-10 p-5 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 backdrop-blur-sm payment-info-card">
                        <p className="text-sm text-gray-400 mb-2 font-semibold tracking-wide uppercase">Payment ID</p>
                        <p className="text-sm text-gray-200 font-mono break-all bg-black/20 p-3 rounded-lg">
                            {paymentId}
                        </p>
                    </div>
                )}

                {/* What's Next with staggered items */}
                <div className="mb-10 text-left">

                    <div className="space-y-4 gap-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', gap: '1rem', marginTop: '1rem', marginBottom: '1rem' }}>
                        {[
                            { icon: '📧', text: 'Check your email for the receipt' },
                            { icon: '✨', text: 'Access your premium features' },
                            { icon: '💬', text: 'Contact support if you have questions' },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="next-step-item flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                                style={{ animationDelay: `${index * 0.15}s`, width: '100%', paddingLeft: '2px', paddingRight: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
                            >
                                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                                    {index + 1}
                                </span>
                                <div className="flex-1 pt-1">
                                    <span className="text-gray-200 text-base font-medium">{item.text}</span>
                                </div>
                                <span className="text-2xl">{item.icon}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons with enhanced styling */}
                <div className="space-y-4 pt-4">
                    <Link href="/" className="block">
                        <button className="btn-primary w-full text-lg py-4">
                            Return to Home
                        </button>
                    </Link>

                    <div className="pt-2 pb-2">
                        <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Need help?{' '}
                            <a
                                href="mailto:support@example.com"
                                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                            >
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          opacity: 0;
          animation: confetti-fall 3s ease-in infinite;
        }

        @keyframes confetti-fall {
          0% {
            top: -10%;
            opacity: 1;
            transform: translateX(0) rotateZ(0deg);
          }
          100% {
            top: 100%;
            opacity: 0;
            transform: translateX(100px) rotateZ(720deg);
          }
        }

        .success-card {
          animation: slideUp 0.6s ease-out;
          position: relative;
          z-index: 1;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon-wrapper {
          position: relative;
          display: inline-block;
        }

        .success-icon {
          width: 120px;
          height: 120px;
          margin: 0 auto;
          border-radius: 50%;
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 20px 60px rgba(17, 153, 142, 0.4);
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .checkmark-animation {
          animation: checkmark 0.8s ease-in-out 0.3s both;
        }

        @keyframes checkmark {
          0% {
            stroke-dasharray: 0 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 100 100;
            opacity: 1;
          }
        }

        .success-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border: 3px solid rgba(17, 153, 142, 0.3);
          border-radius: 50%;
          animation: ringPulse 2s ease-out infinite;
        }

        .success-ring-delayed {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border: 3px solid rgba(56, 239, 125, 0.3);
          border-radius: 50%;
          animation: ringPulse 2s ease-out 0.5s infinite;
        }

        @keyframes ringPulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }

        .success-title {
          animation: fadeInDown 0.6s ease-out 0.3s both;
        }

        .success-subtitle {
          animation: fadeInDown 0.6s ease-out 0.5s both;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .payment-info-card {
          animation: slideInLeft 0.6s ease-out 0.7s both;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .next-step-item {
          animation: fadeInUp 0.6s ease-out both;
          animation-delay: 0.9s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="spinner"></div>
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
