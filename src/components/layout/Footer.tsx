export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-2">TW Jewls</h3>
            <p className="text-gray-300 text-sm">
              Elegant & Affordable Jewelry - Made with love in Morocco.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-300 text-sm">
              📧{' '}
              <a href="mailto:info@twjewls.com" className="hover:text-soft-pink transition">
                info@twjewls.com
              </a>
            </p>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-soft-pink transition text-sm"
            >
              📸 Instagram
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 TW Jewls. All rights reserved. | Made with ♡ in Morocco</p>
        </div>
      </div>
    </footer>
  );
};
