'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [paramsData, setParamsData] = useState<{ id: string } | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    params.then(setParamsData);
  }, [params]);

  useEffect(() => {
    if (!paramsData) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', paramsData.id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch product';
        setError(message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [paramsData]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-dark mb-4">Product not found</h1>
        <p className="text-gray-600 mb-8">{error || 'The product you are looking for does not exist.'}</p>
        <Link
          href="/shop"
          className="inline-block bg-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/shop" className="text-soft-pink hover:text-pink-600 font-medium mb-8 inline-block">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative h-96 md:h-full bg-beige rounded-xl overflow-hidden min-h-96">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-semibold text-soft-pink uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-dark mb-4">{product.name}</h1>

            <div className="mb-6">
              <p className="text-2xl font-bold text-dark">{formatPrice(product.price)}</p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <p
                className={`text-sm font-semibold ${
                  product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {product.stock > 0
                  ? `✓ ${product.stock} in stock`
                  : '✗ Out of stock'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-dark">Quantity:</label>
              <div className="flex items-center gap-2 bg-soft-pink rounded-lg px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-dark hover:font-bold"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-dark hover:font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-xl font-semibold transition text-lg ${
                isAdded
                  ? 'bg-green-500 text-white'
                  : product.stock > 0
                  ? 'bg-dark text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <Link
              href="/shop"
              className="w-full block text-center py-3 rounded-xl font-semibold border-2 border-dark text-dark hover:bg-dark hover:text-white transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products Info */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-dark mb-4">More About This Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-beige rounded-xl p-4">
            <p className="text-sm text-gray-600">Category</p>
            <p className="font-semibold text-dark capitalize">{product.category}</p>
          </div>
          <div className="bg-beige rounded-xl p-4">
            <p className="text-sm text-gray-600">Added</p>
            <p className="font-semibold text-dark">
              {new Date(product.created_at).toLocaleDateString('en-US')}
            </p>
          </div>
          <div className="bg-beige rounded-xl p-4">
            <p className="text-sm text-gray-600">Shipping</p>
            <p className="font-semibold text-dark">Free/Paid by location</p>
          </div>
        </div>
      </div>
    </div>
  );
}
