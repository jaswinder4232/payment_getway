'use client';

import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, isCartOpen, toggleCart } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        if (cart.length > 0) {
            toggleCart();
            router.push('/checkout');
        }
    };

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={toggleCart}
            />

            {/* Cart Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-bg border-l border-white/10 z-50 flex flex-col cart-slide-in">
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                        <button
                            onClick={toggleCart}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <svg className="w-24 h-24 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
                            <p className="text-gray-500 text-sm">Add some products to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={`${item.id}-${item.size}-${item.color}`}
                                    className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    {/* Product Image Placeholder */}
                                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-400 mb-2">
                                            Size: {item.size} | Color: {item.color}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-purple-400 font-bold">
                                                ₹{(item.price * item.quantity).toLocaleString()}
                                            </span>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                                >
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>
                                                <span className="w-8 text-center text-white font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                                >
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                                        className="p-2 rounded-lg hover:bg-red-500/20 transition-colors self-start"
                                    >
                                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-white/10 space-y-4">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between text-lg">
                            <span className="text-gray-400">Subtotal:</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                ₹{getCartTotal().toLocaleString()}
                            </span>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            className="btn-primary w-full text-lg py-4"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
        .cart-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
        </>
    );
}
