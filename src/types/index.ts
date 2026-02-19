export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'necklaces' | 'rings' | 'bracelets';
  stock: number;
  image_url: string;
  created_at: string;
}

export interface CartItem {
  product_id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

export interface CheckoutFormData {
  customer_name: string;
  phone: string;
  address: string;
  city: string;
}

export const MOROCCAN_CITIES = [
  'Casablanca',
  'Fez',
  'Marrakech',
  'Rabat',
  'Tangier',
  'Agadir',
  'Tangier',
  'Meknes',
  'Oujda',
  'Safi',
  'El Jadida',
  'Essaouira',
  'Kenitra',
  'Tetouan',
  'Taza',
  'Nador',
  'Beni Mellal',
  'Khouribga',
];
