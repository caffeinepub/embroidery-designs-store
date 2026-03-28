import { m as useCart, o as useRouter, f as useActor, r as reactExports, j as jsxRuntimeExports, I as Input } from "./index-DgnMAn86.js";
import { L as Label } from "./label-BLNE5N5n.js";
import { C as CircleCheckBig } from "./circle-check-big-BI2aBGfq.js";
import "./index-DbqYLIih.js";
function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { navigate } = useRouter();
  const { actor } = useActor();
  const [name, setName] = reactExports.useState("");
  const [whatsapp, setWhatsapp] = reactExports.useState("");
  const [done, setDone] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  if (items.length === 0 && !done) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background pt-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-lg text-foreground mb-4", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate("/shop"),
          className: "font-cinzel text-xs tracking-widest uppercase px-6 py-3 bg-gold text-[oklch(0.08_0_0)] rounded-sm font-bold",
          children: "Shop Now"
        }
      )
    ] }) });
  }
  if (done) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background pt-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-4 max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-16 h-16 text-gold mx-auto mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-cinzel text-2xl font-bold text-foreground mb-4", children: "Order Confirmed!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-secondary))] mb-8", children: "Your order has been sent via WhatsApp. We will confirm payment details and send your files shortly." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate("/shop"),
          className: "font-cinzel text-xs tracking-widest uppercase px-8 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm font-bold",
          children: "Continue Shopping"
        }
      )
    ] }) });
  }
  const handleConfirm = async () => {
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      const itemsList = items.map(
        (i) => `• ${i.product.name} x${i.quantity} — ${i.product.priceUsd}`
      ).join("\n");
      const message = `Hi! I'd like to place an order:

${itemsList}

Total: $${totalPrice.toFixed(2)}

Name: ${name}
WhatsApp: ${whatsapp}`;
      const waUrl = `https://wa.me/919914902647?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
      if (actor) {
        const orderId = `order-${Date.now()}`;
        actor.placeOrder(orderId, {
          customerName: name,
          whatsapp,
          items: itemsList,
          total: `$${totalPrice.toFixed(2)}`,
          status: "pending"
        }).catch(console.error);
      }
      clearCart();
      setDone(true);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3", children: "Order" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-cinzel text-3xl font-bold tracking-wider text-foreground uppercase", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6", children: "Your Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Your full name",
                className: "bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block", children: "WhatsApp Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "tel",
                value: whatsapp,
                onChange: (e) => setWhatsapp(e.target.value),
                placeholder: "e.g. +91 9876543210",
                className: "bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-muted))] text-xs mt-6 leading-relaxed", children: "After clicking the button below, WhatsApp will open with your order details pre-filled. We will confirm payment and send your design files." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: items.map(({ product, quantity }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[oklch(var(--text-secondary))] truncate pr-2", children: [
            product.name,
            " ×",
            quantity
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground flex-shrink-0", children: [
            "$",
            (Number.parseFloat(
              product.priceUsd.replace(/[^0-9.]/g, "")
            ) * quantity).toFixed(2)
          ] })
        ] }, product.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[oklch(0.19_0_0)] pt-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-cinzel text-sm tracking-widest uppercase text-foreground", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-cinzel text-xl font-bold text-gold", children: [
            "$",
            totalPrice.toFixed(2)
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleConfirm,
            disabled: !name.trim() || !whatsapp.trim() || loading,
            className: "w-full font-cinzel text-xs tracking-widest uppercase px-6 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm disabled:opacity-50 disabled:cursor-not-allowed",
            children: loading ? "Processing..." : "Confirm Order on WhatsApp"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  CheckoutPage as default
};
