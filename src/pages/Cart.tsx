import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="container py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-heading font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground font-body text-sm mb-6">
          Explore our beautiful collection and find your perfect saree.
        </p>
        <Link to="/sarees">
          <Button className="rounded-full font-body">Browse Sarees</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-heading font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ saree, quantity }) => (
            <div
              key={saree.id}
              className="flex gap-4 p-4 rounded-lg border bg-card shadow-card animate-fade-in"
            >
              <Link to={`/saree/${saree.id}`} className="shrink-0">
                <img
                  src={saree.images[0]}
                  alt={saree.name}
                  className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-md"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/saree/${saree.id}`}>
                  <h3 className="font-heading font-semibold text-sm md:text-base truncate hover:text-primary transition-colors">
                    {saree.name}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground font-body">{saree.fabric} · {saree.color}</p>
                <p className="font-body font-semibold text-primary mt-1">
                  ₹{saree.price.toLocaleString("en-IN")}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border rounded-full">
                    <button
                      onClick={() => updateQuantity(saree.id, quantity - 1)}
                      className="p-1.5 hover:bg-muted rounded-full transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-body">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(saree.id, quantity + 1)}
                      className="p-1.5 hover:bg-muted rounded-full transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(saree.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="font-body font-semibold text-sm shrink-0">
                ₹{(saree.price * quantity).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-card h-fit sticky top-24">
          <h3 className="font-heading font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm font-body">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-heading font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>
          <Link to="/checkout">
            <Button className="w-full mt-6 rounded-full font-body font-medium" size="lg">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
