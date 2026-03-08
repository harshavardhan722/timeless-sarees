import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle, ShoppingBag } from "lucide-react";

interface OrderState {
  customerName: string;
  totalPrice: number;
  itemCount: number;
  whatsappUrl: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as OrderState | null;

  if (!state) return <Navigate to="/" replace />;

  return (
    <main className="container py-12 md:py-20 max-w-lg text-center">
      <div className="bg-card p-8 rounded-2xl border shadow-card space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Order Placed!</h1>
          <p className="text-muted-foreground font-body">
            Thank you, <span className="font-semibold text-foreground">{state.customerName}</span>! Your order has been sent via WhatsApp.
          </p>
        </div>

        <div className="bg-muted rounded-lg p-4 space-y-1 text-sm font-body">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items</span>
            <span className="font-medium">{state.itemCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold text-primary">₹{state.totalPrice.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-medium">Cash on Delivery</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-body">
          We'll confirm your order on WhatsApp shortly. For queries, contact us at +91 89100 81722.
        </p>

        <div className="flex flex-col gap-3 pt-2">
          <Button asChild className="rounded-full font-body gap-2">
            <a href={state.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" /> Send Order on WhatsApp
            </a>
          </Button>
          <Button variant="outline" onClick={() => navigate("/sarees")} className="rounded-full font-body gap-2">
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Button>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
