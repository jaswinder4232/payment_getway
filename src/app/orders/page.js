'use client';

import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Cart from '../../../components/Cart';
import Link from 'next/link';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Load orders from localStorage
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    return (
        <>
            <Header />
            <Cart />

            <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                            My Orders
                        </h1>
                        <p className="text-gray-400">Track and manage your orders</p>
                    </div>

                    {/* Orders List */}
                    {orders.length === 0 ? (
                        <div className="card text-center py-16">
                            <svg className="w-24 h-24 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <h2 className="text-2xl font-bold text-white mb-2">No orders yet</h2>
                            <p className="text-gray-400 mb-6">Start shopping to see your orders here</p>
                            <Link href="/" className="btn-primary inline-flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="card hover:border-purple-500/30 transition-all">
                                    {/* Order Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-white/10">
                                        <div className="mb-4 sm:mb-0">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className="text-lg font-bold text-white">Order #{order.id}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : order.status === 'Processing'
                                                            ? 'bg-yellow-500/20 text-yellow-400'
                                                            : 'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-sm text-gray-400 mb-1">Total Amount</p>
                                            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                ₹{order.total.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-4">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex gap-4 p-4 rounded-xl bg-white/5">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0 flex items-center justify-center">
                                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-white mb-1 truncate">{item.name}</h4>
                                                    <p className="text-sm text-gray-400 mb-2">
                                                        Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                                                    </p>
                                                    <p className="text-purple-400 font-semibold">
                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Actions */}
                                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                                        <button className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors text-sm font-medium">
                                            Track Order
                                        </button>
                                        <button className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors text-sm font-medium">
                                            View Invoice
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
