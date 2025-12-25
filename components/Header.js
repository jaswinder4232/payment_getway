'use client';

import { useCart } from '../context/CartContext';

export default function Header() {
    const { getCartCount, toggleCart } = useCart();
    const cartCount = getCartCount();

    return (
        <header className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            StyleHub
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            Men
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            Women
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            Accessories
                        </a>
                    </nav>

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
                </div>
            </div>
        </header>
    );
}
