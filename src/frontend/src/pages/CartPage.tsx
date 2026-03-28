import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useRouter } from "../router";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { navigate } = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-16 h-16 text-[oklch(var(--text-muted))] mx-auto mb-6" />
          <p className="font-cinzel text-xl font-bold text-foreground mb-2">
            Your cart is empty
          </p>
          <p className="text-[oklch(var(--text-muted))] text-sm mb-8">
            Browse our collection and add designs to get started
          </p>
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="font-cinzel text-xs tracking-widest uppercase px-8 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm font-bold"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Review
          </p>
          <h1 className="font-cinzel text-3xl font-bold tracking-wider text-foreground uppercase">
            Your Cart
          </h1>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-4"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-cinzel text-sm font-semibold text-foreground">
                        {product.name}
                      </h3>
                      <p className="text-[oklch(var(--text-muted))] text-xs mt-1">
                        {product.category}
                      </p>
                      <p className="text-[oklch(var(--text-muted))] text-xs">
                        {product.formats}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-[oklch(var(--text-muted))] hover:text-destructive transition-colors flex-shrink-0"
                      aria-label="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 border border-[oklch(0.19_0_0)] flex items-center justify-center hover:border-gold transition-colors rounded-sm"
                      >
                        <Minus className="w-3 h-3 text-foreground" />
                      </button>
                      <span className="font-cinzel text-sm w-6 text-center text-foreground">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 border border-[oklch(0.19_0_0)] flex items-center justify-center hover:border-gold transition-colors rounded-sm"
                      >
                        <Plus className="w-3 h-3 text-foreground" />
                      </button>
                    </div>
                    <span className="font-cinzel font-bold text-gold">
                      $
                      {(
                        Number.parseFloat(
                          product.priceUsd.replace(/[^0-9.]/g, ""),
                        ) * quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-6 sticky top-24">
              <h2 className="font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex justify-between text-sm"
                  >
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
              <div className="border-t border-[oklch(0.19_0_0)] pt-4 mb-6">
                <div className="flex justify-between items-center">
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
                onClick={() => navigate("/checkout")}
                className="w-full font-cinzel text-xs tracking-widest uppercase px-6 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm"
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="w-full mt-3 font-cinzel text-xs tracking-widest uppercase px-6 py-3 border border-[oklch(0.19_0_0)] text-[oklch(var(--text-secondary))] hover:border-gold hover:text-gold transition-all rounded-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
