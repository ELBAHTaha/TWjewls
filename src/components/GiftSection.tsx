import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

const GiftSection = () => {
  const giftProducts = products.filter((p) => p.price < 150).slice(0, 3);

  return (
    <section id="gifts" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <p className="text-xs tracking-[0.3em] uppercase text-rose-gold">Gift ideas</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-foreground">
            Perfect Gifts Under 150 MAD
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto font-light">
            Thoughtful, elegant, and always appreciated. Find the perfect piece for someone special.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          {giftProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
