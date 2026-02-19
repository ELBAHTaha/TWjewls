import Link from 'next/link';

export default function Home() {
  const categories = [
    { name: 'Necklaces', emoji: '✨', slug: 'necklaces' },
    { name: 'Rings', emoji: '💎', slug: 'rings' },
    { name: 'Bracelets', emoji: '💫', slug: 'bracelets' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-beige to-soft-pink py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-dark mb-4">
            TW Jewls
          </h1>
          <p className="text-xl sm:text-2xl text-dark mb-8">
            Elegant & Affordable Jewelry
          </p>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Handcrafted with love in Morocco. Premium jewelry for students, young women, and gift seekers.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-dark text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group"
            >
              <div className="bg-soft-pink rounded-xl p-8 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-6xl mb-4">{category.emoji}</div>
                <h3 className="text-2xl font-semibold text-dark mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 group-hover:text-dark transition">
                  Explore Collection →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-beige py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-dark mb-8">
            Why Choose TW Jewls?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-2">✨</div>
              <h3 className="font-semibold text-lg text-dark mb-2">Premium Quality</h3>
              <p className="text-gray-700">Handcrafted with attention to detail</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💰</div>
              <h3 className="font-semibold text-lg text-dark mb-2">Affordable Prices</h3>
              <p className="text-gray-700">Luxury doesn&apos;t have to be expensive</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🚚</div>
              <h3 className="font-semibold text-lg text-dark mb-2">Free Local Delivery</h3>
              <p className="text-gray-700">In Casablanca & paid delivery elsewhere</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
