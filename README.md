# TW Jewls - E-Commerce Website

A minimalist, cute, and trendy jewelry e-commerce platform built with Next.js, TypeScript, Tailwind CSS, and Supabase. Designed for students, young women, and gift buyers in Morocco.

## 🎯 Features

- ✨ Minimalist & feminine design with soft color palette
- 🛍️ Product catalog (Necklaces, Rings, Bracelets)
- 🛒 Shopping cart with localStorage persistence
- 💳 Checkout with cash on delivery
- 📦 Free delivery in Casablanca, paid delivery elsewhere
- 📱 Fully responsive (mobile-first)
- ⚡ Built with Next.js 15 & TypeScript
- 🎨 Styled with Tailwind CSS
- 🔐 Supabase for database & storage
- 🚀 Ready for Vercel deployment

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available at https://supabase.com)

### 2. Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### 3. Setup Supabase

1. Create a new Supabase project
2. Go to SQL editor and run the SQL from `DATABASE_SCHEMA.sql`
3. Copy your credentials from **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Paste them into `.env.local`

### 4. Add Sample Products (Optional)

In your Supabase SQL editor, uncomment and run the sample data from `DATABASE_SCHEMA.sql`.

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (root)             # Root layout
│   ├── shop/              # Product listing page
│   ├── product/[id]/      # Product detail page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Order checkout page
│   └── about/             # About page
├── components/
│   ├── ProductCard.tsx    # Reusable product card
│   └── layout/
│       ├── Navbar.tsx     # Navigation bar
│       └── Footer.tsx     # Footer component
├── context/
│   └── CartContext.tsx    # Cart state management
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript interfaces
```

## 🎨 Design System

### Colors
- **Primary**: Dark (#3D3D3D)
- **Accent**: Soft Pink (#F3E8E3)
- **Background**: Beige (#F5F1ED)
- **Neutral**: White

### Typography
- Clean, modern sans-serif
- Font weights: Regular, Semibold, Bold

### Components
- Rounded corners (rounded-xl)
- Soft shadows
- Hover transitions
- Mobile-first responsive design

## 🛒 Cart Management

The cart uses React Context API with localStorage persistence:

- **State**: Managed in `CartContext.tsx`
- **Storage**: Persisted to `localStorage` automatically
- **Features**:
  - Add products
  - Update quantities
  - Remove items
  - Calculate subtotals
  - Clear cart on order completion

## 💳 Checkout Flow

1. **Cart Review**: User reviews items
2. **Delivery Address**: Enter name, phone, address, city
3. **Delivery Fee Calculation**: 
   - Free in Casablanca
   - 30 MAD for other cities (configurable)
4. **Order Confirmation**: Data saved to Supabase
5. **Success Message**: Order confirmation shown

## 🔧 Configuration

Edit these files to customize:

### Delivery City & Fee
File: `src/lib/utils.ts`

```typescript
export const DELIVERY_CONFIG = {
  FREE_DELIVERY_CITY: 'Casablanca', // Change to your city
  PAID_DELIVERY_FEE: 30, // MAD
};
```

### Moroccan Cities List
File: `src/types/index.ts`

```typescript
export const MOROCCAN_CITIES = [
  'Casablanca',
  'Fez',
  // ... add more cities as needed
];
```

### Supabase Images Domain
File: `next.config.mjs`

```javascript
images: {
  domains: ['your-supabase-domain.supabase.co'],
}
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Visit https://vercel.com
3. Import your repository
4. Add environment variables
5. Deploy!

```bash
# Or deploy directly from CLI
npm install -g vercel
vercel
```

## 📝 Database Schema

### products

| Column      | Type         | Notes                          |
|------------|--------------|--------------------------------|
| id         | UUID, PK     | Auto-generated                 |
| name       | TEXT         | Product name                   |
| description| TEXT         | Product description            |
| price      | NUMERIC      | Price in MAD                   |
| category   | TEXT         | 'necklaces', 'rings', 'bracelets' |
| stock      | INTEGER      | Available quantity             |
| image_url  | TEXT         | Supabase storage URL           |
| created_at | TIMESTAMP    | Auto-generated                 |

### orders

| Column       | Type         | Notes                          |
|-------------|--------------|--------------------------------|
| id          | UUID, PK     | Auto-generated                 |
| customer_name| TEXT        | Customer full name             |
| phone       | TEXT         | Customer phone number          |
| address     | TEXT         | Delivery address               |
| city        | TEXT         | City name                      |
| subtotal    | NUMERIC      | Items total (MAD)              |
| delivery_fee| NUMERIC      | Delivery cost (MAD)            |
| total       | NUMERIC      | Final total (MAD)              |
| status      | TEXT         | 'pending', 'confirmed', 'shipped', 'delivered' |
| created_at  | TIMESTAMP    | Auto-generated                 |

### order_items

| Column      | Type         | Notes                          |
|------------|--------------|--------------------------------|
| id         | UUID, PK     | Auto-generated                 |
| order_id   | UUID, FK     | References orders.id           |
| product_id | UUID, FK     | References products.id         |
| quantity   | INTEGER      | Quantity ordered               |
| price      | NUMERIC      | Item price (MAD)               |
| created_at | TIMESTAMP    | Auto-generated                 |

## 🚀 Next Steps

- Add product images to Supabase Storage
- Customize colors in `tailwind.config.ts`
- Add more pages (FAQs, Returns, etc.)
- Set up email notifications
- Add product reviews
- Implement admin dashboard
- Add multiple language support

## 📧 Support

For questions or support:
- Email: info@twjewls.com
- Instagram: @twjewls

## 📄 License

All rights reserved © 2026 TW Jewls
