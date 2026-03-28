import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";
import { useRouter } from "../router";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { navigate } = useRouter();
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (items.length === 0 && !done) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="font-cinzel text-lg text-foreground mb-4">
            Your cart is empty
          </p>
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="font-cinzel text-xs tracking-widest uppercase px-6 py-3 bg-gold text-[oklch(0.08_0_0)] rounded-sm font-bold"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-cinzel text-2xl font-bold text-foreground mb-4">
            Order Confirmed!
          </h2>
          <p className="text-[oklch(var(--text-secondary))] mb-8">
            Your order has been sent via WhatsApp. We will confirm payment
            details and send your files shortly.
          </p>
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="font-cinzel text-xs tracking-widest uppercase px-8 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm font-bold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      const itemsList = items
        .map(
          (i) => `• ${i.product.name} x${i.quantity} — ${i.product.priceUsd}`,
        )
        .join("\n");
      const message = `Hi! I'd like to place an order:\n\n${itemsList}\n\nTotal: $${totalPrice.toFixed(2)}\n\nName: ${name}\nWhatsApp: ${whatsapp}`;
      const waUrl = `https://wa.me/919914902647?text=${encodeURIComponent(message)}`;

      // Open WhatsApp FIRST (before any async call) to avoid browser popup block
      window.open(waUrl, "_blank");

      // Then save order to backend in background
      if (actor) {
        const orderId = `order-${Date.now()}`;
        actor
          .placeOrder(orderId, {
            customerName: name,
            whatsapp,
            items: itemsList,
            total: `$${totalPrice.toFixed(2)}`,
            status: "pending",
          })
          .catch(console.error);
      }

      clearCart();
      setDone(true);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Order
          </p>
          <h1 className="font-cinzel text-3xl font-bold tracking-wider text-foreground uppercase">
            Checkout
          </h1>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-8">
            <h2 className="font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6">
              Your Details
            </h2>
            <div className="space-y-4">
              <div>
                <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                  Full Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
                />
              </div>
              <div>
                <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                  WhatsApp Number
                </Label>
                <Input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
                />
              </div>
            </div>
            <p className="text-[oklch(var(--text-muted))] text-xs mt-6 leading-relaxed">
              After clicking the button below, WhatsApp will open with your
              order details pre-filled. We will confirm payment and send your
              design files.
            </p>
          </div>

          {/* Summary */}
          <div className="border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-8">
            <h2 className="font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-[oklch(var(--text-secondary))] truncate pr-2">
                    {product.name} ×{quantity}
                  </span>
                  <span className="text-foreground flex-shrink-0">
                    $
                    {(
                      Number.parseFloat(
                        product.priceUsd.replace(/[^0-9.]/g, ""),
                      ) * quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[oklch(0.19_0_0)] pt-4 mb-8">
              <div className="flex justify-between">
                <span className="font-cinzel text-sm tracking-widest uppercase text-foreground">
                  Total
                </span>
                <span className="font-cinzel text-xl font-bold text-gold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!name.trim() || !whatsapp.trim() || loading}
              className="w-full font-cinzel text-xs tracking-widest uppercase px-6 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Confirm Order on WhatsApp"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
