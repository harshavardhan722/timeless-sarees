import { useParams, Link } from "react-router-dom";
import { useSaree } from "@/hooks/useSarees";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowLeft, Check, X as XIcon } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

const SareeDetail = () => {
  const { id } = useParams();
  const { data: saree, isLoading } = useSaree(id);
  const { addToCart } = useCart();
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <div className="animate-pulse space-y-4 max-w-md mx-auto">
          <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
          <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  if (!saree) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground font-body">Saree not found.</p>
        <Link to="/sarees">
          <Button variant="outline" className="mt-4 font-body">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(saree);
    toast.success(`${saree.name} added to cart!`);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <main className="container py-6 md:py-12">
      <Link
        to="/sarees"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div
          ref={imgRef}
          className="relative overflow-hidden rounded-lg bg-cream aspect-[3/4] cursor-zoom-in shadow-elegant"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={saree.images[0]}
            alt={saree.name}
            className="w-full h-full object-cover transition-transform duration-300"
            loading="lazy"
            decoding="async"
            style={
              zoomed
                ? {
                    transform: "scale(2)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  }
                : {}
            }
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="font-body text-xs">{saree.fabric}</Badge>
              <Badge variant="secondary" className="font-body text-xs">{saree.occasion}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              {saree.name}
            </h1>
          </div>

          <p className="text-3xl font-heading font-bold text-primary">
            ₹{saree.price.toLocaleString("en-IN")}
          </p>

          <p className="text-sm font-body text-muted-foreground leading-relaxed">
            {saree.description}
          </p>

          <div className="grid grid-cols-2 gap-4 py-4 border-y">
            <div>
              <p className="text-xs text-muted-foreground font-body">Fabric</p>
              <p className="text-sm font-body font-medium">{saree.fabric}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body">Color</p>
              <p className="text-sm font-body font-medium">{saree.color}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body">Occasion</p>
              <p className="text-sm font-body font-medium">{saree.occasion}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-body">Blouse Piece</p>
              <p className="text-sm font-body font-medium flex items-center gap-1">
                {saree.blouse_piece ? (
                  <><Check className="h-4 w-4 text-green-600" /> Included</>
                ) : (
                  <><XIcon className="h-4 w-4 text-destructive" /> Not Included</>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                saree.stock > 0 ? "bg-green-500" : "bg-destructive"
              }`}
            />
            <span className="text-sm font-body">
              {saree.stock > 0 ? `${saree.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={saree.stock <= 0}
            className="w-full md:w-auto gap-2 rounded-full font-body font-medium mt-2"
          >
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
};

export default SareeDetail;
