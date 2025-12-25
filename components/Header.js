'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function Header() {
    const { getCartCount, toggleCart } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartCount = getCartCount();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                StyleHub
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                Shop
                            </Link>
                            <Link href="/orders" className="text-gray-300 hover:text-white transition-colors">
                                My Orders
                            </Link>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                About
                            </a>
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-2">
                            {/* Cart Button */}
                            <button
                                onClick={toggleCart}
                                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                {isMobileMenuOpen ? (
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-white/10 mobile-menu-slide">
                        <div className="px-4 py-4 space-y-3">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className="font-medium">Shop</span>
                                </div>
                            </Link>

                            <Link
                                href="/orders"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <span className="font-medium">My Orders</span>
                                </div>
                            </Link>

                            <a
                                href="#"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium">About</span>
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </header>

            <style jsx>{`
        .mobile-menu-slide {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
}
