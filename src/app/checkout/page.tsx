'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { formatPrice, calculateTotals } from '@/lib/utils';
import Link from 'next/link';
import { CheckoutFormData, MOROCCAN_CITIES } from '@/types';

export default function CheckoutPage() {
  const { items, clearCart, getSubtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState(MOROCCAN_CITIES[0]);
  const [formData, setFormData] = useState<CheckoutFormData>({
    customer_name: '',
    phone: '',
    address: '',
    city: MOROCCAN_CITIES[0],
  });

  if (items.length === 0 && !success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">Checkout</h1>
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

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-green-100 rounded-xl p-8 max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-dark mb-4">✓ Order Confirmed!</h1>
          <p className="text-gray-700 mb-4">
            Thank you for your order. We&apos;ll contact you soon to confirm delivery details.
          </p>
          <p className="text-sm text-gray-600 mb-8">
            Order reference: {Math.random().toString(36).substring(7).toUpperCase()}
          </p>
          <Link
            href="/"
            className="inline-block bg-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const { delivery_fee, total } = calculateTotals(subtotal, formData.city);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'city') {
      setSelectedCity(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: formData.customer_name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            subtotal,
            delivery_fee,
            total,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and show success
      clearCart();
      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create order';
      setError(message);
      console.error('Error creating order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-dark mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+212 6xx-xxxxxx"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                City *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-pink"
              >
                {MOROCCAN_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dark text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Confirm Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-beige rounded-xl p-6 sticky top-20">
            <h2 className="text-xl font-bold text-dark mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product_id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-semibold text-dark">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-semibold text-dark">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Delivery ({formData.city})</span>
                <span className="font-semibold text-dark">
                  {formatPrice(delivery_fee)}
                </span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between">
                <span className="font-bold text-dark">Total</span>
                <span className="text-2xl font-bold text-dark">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-300">
              <p className="text-xs text-gray-600">
                <strong>Payment Method:</strong> Cash on Delivery
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Pay when you receive your order. We operate only in Morocco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
