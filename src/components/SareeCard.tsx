import { Link } from "react-router-dom";
import { Saree } from "@/data/sarees";
import { Badge } from "@/components/ui/badge";

interface SareeCardProps {
  saree: Saree;
}

const SareeCard = ({ saree }: SareeCardProps) => {
  const inStock = saree.stock > 0;

  return (
    <Link
      to={`/saree/${saree.id}`}
      className="group block animate-fade-in"
    >
      <div className="relative overflow-hidden rounded-lg bg-cream aspect-[3/4] shadow-card">
        <img
          src={saree.images[0]}
          alt={saree.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-xs font-body bg-card/90 backdrop-blur-sm">
            {saree.fabric}
          </Badge>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-heading font-semibold text-foreground text-sm md:text-base leading-tight group-hover:text-primary transition-colors">
          {saree.name}
        </h3>
        <p className="text-xs text-muted-foreground">{saree.occasion}</p>
        <p className="font-body font-semibold text-primary text-base">
          ₹{saree.price.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
};

export default SareeCard;
