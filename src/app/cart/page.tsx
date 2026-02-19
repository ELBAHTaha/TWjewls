'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { formatPrice, calculateTotals, DELIVERY_CONFIG } from '@/lib/utils';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">Shopping Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link
          href="/shop"
          className="inline-block bg-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-dark mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product_id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-dark mb-1">{item.product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.product.description}</p>
                  <p className="text-lg font-bold text-dark">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2 bg-soft-pink rounded-lg px-3 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product_id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="text-dark hover:font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="text-dark hover:font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="text-red-600 text-sm hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-beige rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold text-dark mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>Items ({items.reduce((total, item) => total + item.quantity, 0)})</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery fee</span>
              <span className="text-xs font-medium">
                (Select city at checkout)
              </span>
            </div>
            <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-dark">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-gray-600">
              💡 Free delivery in {DELIVERY_CONFIG.FREE_DELIVERY_CITY}
            </p>
          </div>

          <Link
            href="/checkout"
            className="w-full block text-center bg-dark text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/shop"
            className="w-full block text-center mt-3 bg-white text-dark py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
