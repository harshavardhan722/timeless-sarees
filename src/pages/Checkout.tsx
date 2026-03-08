import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useCreateOrder } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill in all fields");
      return;
    }

    // Build WhatsApp message
    const orderLines = items
      .map(
        ({ saree, quantity }) =>
          `Product: ${saree.name}\nQuantity: ${quantity}\nPrice: ₹${(saree.price * quantity).toLocaleString("en-IN")}`
      )
      .join("\n\n");

    const message = `Hello Amma Sarees, I want to place an order.

Customer Details:
Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}

Order Details:
${orderLines}

Order Summary:
Total Amount: ₹${totalPrice.toLocaleString("en-IN")}
Payment Method: Cash on Delivery`;

    const whatsappUrl = `https://wa.me/918910081722?text=${encodeURIComponent(message)}`;

    try {
      await createOrder.mutateAsync({
        customer_name: form.name,
        customer_phone: form.phone,
        customer_address: form.address,
        total_price: totalPrice,
        items: items.map(({ saree, quantity }) => ({
          saree_id: saree.id,
          quantity,
          price: saree.price * quantity,
        })),
      });
      const confirmState = { customerName: form.name, totalPrice, itemCount: items.reduce((s, i) => s + i.quantity, 0), whatsappUrl };
      clearCart();
      navigate("/order-confirmation", { state: confirmState, replace: true });
    } catch {
      const confirmState = { customerName: form.name, totalPrice, itemCount: items.reduce((s, i) => s + i.quantity, 0), whatsappUrl };
      clearCart();
      navigate("/order-confirmation", { state: confirmState, replace: true });
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <main className="container py-8 md:py-12 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-heading font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card p-6 rounded-lg border shadow-card space-y-4">
          <h2 className="font-heading font-semibold text-lg">Delivery Details</h2>
          <div>
            <Label className="text-sm font-body">Full Name</Label>
            <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter your full name" className="font-body mt-1" />
          </div>
          <div>
            <Label className="text-sm font-body">Phone Number</Label>
            <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className="font-body mt-1" />
          </div>
          <div>
            <Label className="text-sm font-body">Delivery Address</Label>
            <Textarea value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Full address with pin code" className="font-body mt-1" rows={3} />
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-card">
          <h2 className="font-heading font-semibold text-lg mb-3">Payment Method</h2>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
            <div className="h-4 w-4 rounded-full bg-primary" />
            <span className="font-body text-sm font-medium">Cash on Delivery (COD)</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-card">
          <h2 className="font-heading font-semibold text-lg mb-3">Order Summary</h2>
          <div className="space-y-2">
            {items.map(({ saree, quantity }) => (
              <div key={saree.id} className="flex justify-between text-sm font-body">
                <span className="text-muted-foreground">{saree.name} × {quantity}</span>
                <span>₹{(saree.price * quantity).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-3 flex justify-between font-heading font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full rounded-full font-body font-medium" disabled={createOrder.isPending}>
          {createOrder.isPending ? "Placing Order..." : `Place Order — ₹${totalPrice.toLocaleString("en-IN")}`}
        </Button>
      </form>
    </main>
  );
};

export default Checkout;
