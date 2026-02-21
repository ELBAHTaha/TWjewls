import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 bg-secondary/50">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="font-heading text-2xl font-semibold tracking-wide text-foreground">
            TW Jewls
          </div>
          <p className="text-sm text-muted-foreground font-light max-w-sm">
            Elegant & affordable jewelry, handcrafted with love in Morocco.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="mailto:hello@twjewls.com"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
          <div className="border-t border-border/50 pt-6 w-full">
            <p className="text-xs text-muted-foreground">
              © 2026 TW Jewls. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
