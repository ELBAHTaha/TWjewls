import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

const FeaturedCollection = () => {
  const featured = products.slice(0, 6);

  return (
    <section id="collection" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Curated for you</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-foreground">
            Our Collection
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
