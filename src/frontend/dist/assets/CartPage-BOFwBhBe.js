import { c as createLucideIcon, m as useCart, o as useRouter, j as jsxRuntimeExports } from "./index-C8XCLzn6.js";
import { T as Trash2, P as Plus } from "./trash-2-CaxUnrFV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { navigate } = useRouter();
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background pt-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-16 h-16 text-[oklch(var(--text-muted))] mx-auto mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-xl font-bold text-foreground mb-2", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-muted))] text-sm mb-8", children: "Browse our collection and add designs to get started" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate("/shop"),
          className: "font-cinzel text-xs tracking-widest uppercase px-8 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm font-bold",
          children: "Shop Now"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3", children: "Review" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-cinzel text-3xl font-bold tracking-wider text-foreground uppercase", children: "Your Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", children: items.map(({ product, quantity }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-4 border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: product.imageUrl,
                alt: product.name,
                className: "w-20 h-20 object-cover rounded-sm flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-cinzel text-sm font-semibold text-foreground", children: product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-muted))] text-xs mt-1", children: product.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-muted))] text-xs", children: product.formats })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeItem(product.id),
                    className: "text-[oklch(var(--text-muted))] hover:text-destructive transition-colors flex-shrink-0",
                    "aria-label": "Remove",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(product.id, quantity - 1),
                      className: "w-7 h-7 border border-[oklch(0.19_0_0)] flex items-center justify-center hover:border-gold transition-colors rounded-sm",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3 text-foreground" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-cinzel text-sm w-6 text-center text-foreground", children: quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(product.id, quantity + 1),
                      className: "w-7 h-7 border border-[oklch(0.19_0_0)] flex items-center justify-center hover:border-gold transition-colors rounded-sm",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 text-foreground" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-cinzel font-bold text-gold", children: [
                  "$",
                  (Number.parseFloat(
                    product.priceUsd.replace(/[^0-9.]/g, "")
                  ) * quantity).toFixed(2)
                ] })
              ] })
            ] })
          ]
        },
        product.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-6 sticky top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-6", children: items.map(({ product, quantity }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-sm",
            children: [
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
            ]
          },
          product.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[oklch(0.19_0_0)] pt-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
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
            onClick: () => navigate("/checkout"),
            className: "w-full font-cinzel text-xs tracking-widest uppercase px-6 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm",
            children: "Proceed to Checkout"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate("/shop"),
            className: "w-full mt-3 font-cinzel text-xs tracking-widest uppercase px-6 py-3 border border-[oklch(0.19_0_0)] text-[oklch(var(--text-secondary))] hover:border-gold hover:text-gold transition-all rounded-sm",
            children: "Continue Shopping"
          }
        )
      ] }) })
    ] }) })
  ] });
}
export {
  CartPage as default
};
