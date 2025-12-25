'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, selectedSize = 'M', selectedColor = null) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id && item.size === selectedSize && item.color === selectedColor
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id && item.size === selectedSize && item.color === selectedColor
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...prevCart,
                {
                    ...product,
                    quantity: 1,
                    size: selectedSize,
                    color: selectedColor || product.colors[0],
                },
            ];
        });
    };

    const removeFromCart = (productId, size, color) => {
        setCart((prevCart) =>
            prevCart.filter(
                (item) => !(item.id === productId && item.size === size && item.color === color)
            )
        );
    };

    const updateQuantity = (productId, size, color, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId, size, color);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.size === size && item.color === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
                isCartOpen,
                toggleCart,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
