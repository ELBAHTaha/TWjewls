import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-dark mb-8">About TW Jewls</h1>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="text-2xl font-bold text-dark mb-4">Our Story</h2>
          <p className="mb-4">
            TW Jewls is a minimalist, cute, and trendy jewelry brand based in Casablanca, Morocco.
            We believe that elegant jewelry should be affordable and accessible to everyone.
          </p>
          <p>
            Each piece is carefully handcrafted with attention to detail, combining traditional
            Moroccan craftsmanship with modern design aesthetics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark mb-4">Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Necklaces', desc: 'Delicate and elegant pieces for every occasion' },
              { name: 'Rings', desc: 'Perfect everyday and statement rings' },
              { name: 'Bracelets', desc: 'Stylish bracelets to complete your look' },
            ].map((item) => (
              <div key={item.name} className="bg-soft-pink rounded-xl p-4">
                <h3 className="font-semibold text-dark mb-2">{item.name}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark mb-4">Who We&apos;re For</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Students looking for affordable fashion jewelry</li>
            <li>Young women who appreciate minimalist design</li>
            <li>Gift seekers wanting something special and unique</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark mb-4">Shipping & Delivery</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Free delivery in Casablanca</li>
            <li>Fixed delivery fee (30 MAD) for other Moroccan cities</li>
            <li>Cash on Delivery payment method</li>
            <li>We operate exclusively in Morocco</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-dark mb-4">Get in Touch</h2>
          <p className="mb-4">
            Have questions? We&apos;d love to hear from you!
          </p>
          <p>
            📧{' '}
            <a
              href="mailto:info@twjewls.com"
              className="text-soft-pink hover:text-pink-600 font-semibold"
            >
              info@twjewls.com
            </a>
          </p>
          <p>
            📸{' '}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft-pink hover:text-pink-600 font-semibold"
            >
              Follow us on Instagram
            </a>
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/shop"
          className="inline-block bg-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
