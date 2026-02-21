import categoryNecklaces from "@/assets/category-necklaces.jpg";
import categoryRings from "@/assets/category-rings.jpg";
import categoryBracelets from "@/assets/category-bracelets.jpg";

const categories = [
  { name: "Necklaces", image: categoryNecklaces },
  { name: "Rings", image: categoryRings },
  { name: "Bracelets", image: categoryBracelets },
];

const CategoriesSection = () => {
  return (
    <section id="categories" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Browse by</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-foreground">
            Categories
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#collection"
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-heading font-light text-warm-white tracking-wide">
                  {cat.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
