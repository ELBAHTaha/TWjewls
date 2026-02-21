import { Plus } from "lucide-react";
import { useCart, type Product } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-foreground hover:text-background"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
      <div className="space-y-1 px-1">
        <h3 className="text-sm font-medium tracking-wide text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.price} MAD</p>
      </div>
    </div>
  );
};

export default ProductCard;
