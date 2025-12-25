'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, selectedSize, selectedColor);

        setTimeout(() => {
            setIsAdding(false);
        }, 600);
    };

    return (
        <div className="card group cursor-pointer">
            {/* Product Image */}
            <div className="relative h-64 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div className="absolute top-2 right-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.category}
                </div>
            </div>

            {/* Product Info */}
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {product.name}
            </h3>
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {product.description}
            </p>

            {/* Price */}
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                ₹{product.price.toLocaleString()}
            </div>

            {/* Size Selection */}
            <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Size:</p>
                <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1 rounded-lg text-sm transition-all ${selectedSize === size
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Selection */}
            <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Color:</p>
                <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1 rounded-lg text-sm transition-all ${selectedColor === color
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`btn-primary w-full ${isAdding ? 'scale-95' : ''}`}
            >
                {isAdding ? (
                    <>
                        <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Added!
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                    </>
                )}
            </button>
        </div>
    );
}
