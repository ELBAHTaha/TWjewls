import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const Navbar = () => {
  const { openCart, totalItems } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <div className="font-heading text-2xl md:text-3xl font-semibold tracking-wide text-foreground">
          TW Jewls
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase text-muted-foreground">
          <a href="#collection" className="hover:text-foreground transition-colors duration-300">Collection</a>
          <a href="#categories" className="hover:text-foreground transition-colors duration-300">Categories</a>
          <a href="#gifts" className="hover:text-foreground transition-colors duration-300">Gifts</a>
        </div>

        <button
          onClick={openCart}
          className="relative p-2 text-foreground hover:text-primary transition-colors duration-300"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 flex items-center justify-center text-[10px] font-medium bg-primary text-primary-foreground rounded-full min-w-[18px] h-[18px]">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
