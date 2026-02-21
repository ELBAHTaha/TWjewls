import { Instagram } from "lucide-react";
import productNecklace1 from "@/assets/product-necklace-1.jpg";
import productNecklace3 from "@/assets/product-necklace-3.jpg";
import productBracelet1 from "@/assets/product-bracelet-1.jpg";
import productEarrings1 from "@/assets/product-earrings-1.jpg";
import categoryNecklaces from "@/assets/category-necklaces.jpg";
import categoryBracelets from "@/assets/category-bracelets.jpg";

const images = [
  productNecklace1,
  categoryNecklaces,
  productBracelet1,
  productEarrings1,
  productNecklace3,
  categoryBracelets,
];

const InstagramSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="text-center mb-10 md:mb-14 space-y-3">
          <Instagram className="w-6 h-6 mx-auto text-muted-foreground" strokeWidth={1.5} />
          <h2 className="text-2xl md:text-3xl font-heading font-light text-foreground">
            @twjewls
          </h2>
          <p className="text-sm text-muted-foreground font-light">
            Follow us for daily inspiration
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {images.map((img, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square overflow-hidden rounded-xl group"
            >
              <img
                src={img}
                alt="TW Jewls on Instagram"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
