-- TW Jewls Database Schema
-- Run these SQL commands in your Supabase SQL editor

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL CHECK (category IN ('necklaces', 'rings', 'bracelets')),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  subtotal NUMERIC NOT NULL CHECK (subtotal >= 0),
  delivery_fee NUMERIC NOT NULL CHECK (delivery_fee >= 0),
  total NUMERIC NOT NULL CHECK (total >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC NOT NULL CHECK (price >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Sample Data (Optional - Insert example products)
-- Uncomment to add sample products to your database

/*
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Delicate Gold Necklace', 'Elegant 18K gold-plated necklace with minimalist design', 299, 'necklaces', 10, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop'),
('Silver Minimalist Ring', 'Pure silver adjustable ring with modern aesthetic', 199, 'rings', 15, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop'),
('Pearl Bracelet', 'Handcrafted bracelet with natural pearls', 399, 'bracelets', 8, 'https://images.unsplash.com/photo-1534558814975-aa79f3ee5f2f?w=500&h=500&fit=crop'),
('Gold Chain Necklace', 'Dainty gold chain perfect for everyday wear', 249, 'necklaces', 12, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'),
('Statement Ring Set', 'Set of 3 minimalist rings in gold, silver, and rose gold', 349, 'rings', 7, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop');
*/
