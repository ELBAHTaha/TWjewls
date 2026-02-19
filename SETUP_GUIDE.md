# TW Jewls Setup Guide

## ✅ Project Successfully Created!

Your Next.js e-commerce website is now ready. Here's what's been set up:

## 🚀 Next Steps to Launch

### 1. **Set Up Supabase**

1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to **Project Settings → API**
4. Copy these values:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Create `.env.local` file in your project root and paste:

```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### 2. **Create Database Tables**

1. In Supabase, go to the **SQL Editor**
2. Click **New Query**
3. Copy the entire content from `DATABASE_SCHEMA.sql` (in your project root)
4. Run the query
5. (Optional) Uncomment the sample data at the bottom to add test products

### 3. **Run Development Server**

```bash
npm run dev
```

Visit http://localhost:3000 in your browser. You should see the TW Jewls homepage! 🎉

### 4. **Test the Features**

- Browse to `/shop` and see your products
- Click on a product to view details
- Add items to cart (stored in localStorage)
- Go to `/cart` to review
- Click "Proceed to Checkout" to complete order (saves to Supabase)

## 📁 Project Structure

```
tw-jewls/
├── src/
│   ├── app/                 # Next.js pages & routing
│   │   ├── layout.tsx       # Root layout with cart provider
│   │   ├── page.tsx         # Homepage with hero & categories
│   │   ├── shop/            # Product listing page
│   │   ├── product/[id]/    # Product detail page
│   │   ├── cart/            # Shopping cart page
│   │   ├── checkout/        # Order checkout page
│   │   └── about/           # About page
│   ├── components/
│   │   ├── ProductCard.tsx  # Reusable product card component
│   │   └── layout/
│   │       ├── Navbar.tsx   # Navigation bar with cart icon
│   │       └── Footer.tsx   # Footer with contact info
│   ├── context/
│   │   └── CartContext.tsx  # React Context for cart state
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client setup
│   │   └── utils.ts         # Utility functions (pricing, delivery)
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── DATABASE_SCHEMA.sql      # Supabase SQL schema
├── README.md                # Full documentation
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind CSS config
└── next.config.mjs          # Next.js config
```

## 🎨 Key Features Implemented

- ✨ Minimalist design with soft color palette (beige, soft pink)
- 🛍️ Product catalog with category filtering
- 🛒 Shopping cart with localStorage persistence
- 💳 Checkout with form validation
- 📦 Delivery fee logic (free in Casablanca, configurable)
- 📱 Fully responsive (mobile-first)
- ⚡ TypeScript throughout
- 🎯 Client-side cart context management
- 🚀 Production-ready build

## ⚙️ Configuration

### Change Free Delivery City

Edit `src/lib/utils.ts`:

```typescript
export const DELIVERY_CONFIG = {
  FREE_DELIVERY_CITY: 'Casablanca', // Change to your city
  PAID_DELIVERY_FEE: 30, // MAD
};
```

### Customize Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'beige': '#F5F1ED',      // Background
  'soft-pink': '#F3E8E3',  // Accent
  'dark': '#3D3D3D',       // Primary text
}
```

### Add Product Images

Images are referenced by URL in the `products` table. You can:

1. Upload images to Supabase Storage
2. Use external URLs
3. Upload to Cloudinary or similar service

## 🚢 Deploy to Production

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository  
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

## 📚 Key Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Context API
- **Payment**: Cash on Delivery (COD)
- **Deployment**: Vercel

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 Database Schema

### products
- id, name, description, price, category, stock, image_url, created_at

### orders
- id, customer_name, phone, address, city, subtotal, delivery_fee, total, status, created_at

### order_items
- id, order_id, product_id, quantity, price, created_at

## 🎯 What's Not Included (Yet)

- Authentication/login
- Admin panel
- Stripe/payment gateway (Cash on Delivery only)
- Email notifications
- Product reviews
- Wishlist
- Multiple languages

These can be added later as your business grows!

## 📧 Support & Customization

The code is clean, well-structured, and easy to customize. All components are modular and reusable.

For questions or customization needs:
- Review the README.md for detailed documentation
- Check the DATABASE_SCHEMA.sql for database structure
- Examine component files for implementation details

## 🎉 You're All Set!

Your TW Jewls e-commerce website is ready to launch. Follow the setup steps above and start selling!

Good luck! 💎✨
