import { c as createLucideIcon, o as useRouter, m as useCart, f as useActor, r as reactExports, i as useQuery, j as jsxRuntimeExports, p as motion, A as AnimatePresence, L as Link, D as Download, x as ShoppingCart, l as ue, X } from "./index-DgnMAn86.js";
import { L as LoaderCircle } from "./loader-circle-BlF-jIoW.js";
import { M as Minus } from "./minus-hKcSFIUQ.js";
import { P as Plus } from "./plus-Dr398E6w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
function productId(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}
function ImageLightbox({
  src,
  alt,
  onClose
}) {
  const [zoom, setZoom] = reactExports.useState(1);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const zoomIn = (e) => {
    e.stopPropagation();
    setZoom((z) => Math.min(z + 0.25, 3));
  };
  const zoomOut = (e) => {
    e.stopPropagation();
    setZoom((z) => Math.max(z - 0.25, 0.5));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 },
      onClick: onClose,
      "data-ocid": "product.modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/90 backdrop-blur-md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[oklch(0.15_0_0)] border border-[oklch(0.25_0_0)] text-[oklch(0.75_0_0)] hover:text-gold hover:border-gold transition-all duration-200",
            "data-ocid": "product.close_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-[oklch(0.13_0_0)] border border-[oklch(0.22_0_0)] rounded-full px-4 py-2",
            onClickCapture: (e) => e.stopPropagation(),
            role: "presentation",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: zoomOut,
                  className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-[oklch(0.2_0_0)] text-[oklch(0.75_0_0)] hover:text-gold transition-all",
                  "data-ocid": "product.secondary_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-cinzel text-xs tracking-widest text-gold min-w-[3rem] text-center", children: [
                Math.round(zoom * 100),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: zoomIn,
                  className: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-[oklch(0.2_0_0)] text-[oklch(0.75_0_0)] hover:text-gold transition-all",
                  "data-ocid": "product.primary_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "relative z-10 flex items-center justify-center",
            initial: { scale: 0.85, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.85, opacity: 0 },
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            onClickCapture: (e) => e.stopPropagation(),
            role: "presentation",
            style: { maxWidth: "90vw", maxHeight: "90vh" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "border border-[oklch(var(--gold-border))] rounded-sm overflow-hidden shadow-[0_0_60px_oklch(0.69_0.13_75_/_0.2)]",
                style: { overflow: "auto", maxWidth: "90vw", maxHeight: "82vh" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src,
                    alt,
                    style: {
                      transform: `scale(${zoom})`,
                      transformOrigin: "center",
                      transition: "transform 0.3s ease",
                      display: "block",
                      maxWidth: "90vw",
                      maxHeight: "82vh",
                      objectFit: "contain"
                    }
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
function ProductDetailPage({ id }) {
  var _a;
  const { navigate } = useRouter();
  const { addItem } = useCart();
  const { actor, isFetching } = useActor();
  const [lightboxOpen, setLightboxOpen] = reactExports.useState(false);
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => actor.getAllProducts(),
    enabled: !!actor && !isFetching
  });
  const product = (_a = productsQuery.data) == null ? void 0 : _a.find((p) => productId(p.name) === id);
  const pid = product ? productId(product.name) : id;
  if (productsQuery.isLoading || isFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background pt-24 flex items-center justify-center",
        "data-ocid": "product.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 text-gold animate-spin" })
      }
    );
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background pt-24 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center",
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-gold text-xl mb-4", children: "Design not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate("/shop"),
              className: "font-cinzel text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-[oklch(0.08_0_0)] transition-all rounded-sm",
              children: "Back to Shop"
            }
          )
        ]
      }
    ) });
  }
  const waText = encodeURIComponent(
    `Hi! I want to order: ${product.name} - ${product.priceUsd}

Please provide payment details.`
  );
  const handleAddToCart = () => {
    addItem({ ...product, id: pid });
    ue.success(`${product.name} added to cart`);
  };
  const detailItems = [
    { label: "Category", value: product.category },
    { label: "Formats", value: product.formats },
    { label: "Delivery", value: "Instant via WhatsApp" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightboxOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImageLightbox,
      {
        src: product.imageUrl,
        alt: product.name,
        onClose: () => setLightboxOpen(false)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-4",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-[oklch(var(--text-muted))]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-gold transition-colors", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-gold transition-colors", children: "Shop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: product.name })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "border border-[oklch(0.19_0_0)] rounded-sm overflow-hidden",
          initial: { opacity: 0, scale: 0.95, x: -30 },
          animate: { opacity: 1, scale: 1, x: 0 },
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "overflow-hidden relative cursor-pointer group",
              whileHover: { scale: 1.03 },
              transition: { duration: 0.5, ease: "easeOut" },
              onClick: () => setLightboxOpen(true),
              "data-ocid": "product.canvas_target",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrl,
                    alt: product.name,
                    className: "w-full aspect-square object-cover"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 w-14 h-14 rounded-full bg-[oklch(0.1_0_0)]/80 border border-gold flex items-center justify-center shadow-[0_0_20px_oklch(0.69_0.13_75_/_0.4)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "w-6 h-6 text-gold" }) }) })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: "font-cinzel text-xs tracking-[0.3em] text-gold uppercase mb-3",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.15 },
            children: product.category
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.h1,
          {
            className: "font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground mb-4",
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: {
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1]
            },
            children: product.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "w-16 h-px bg-[oklch(var(--gold-border))] mb-6",
            initial: { scaleX: 0 },
            animate: { scaleX: 1 },
            transition: { duration: 0.5, delay: 0.35 },
            style: { transformOrigin: "left" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            className: "text-[oklch(var(--text-secondary))] leading-relaxed mb-6",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.3 },
            children: product.description
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "bg-[oklch(0.13_0_0)] border border-[oklch(0.19_0_0)] rounded-sm p-4 mb-6",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-gold" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-cinzel text-xs tracking-widest uppercase text-foreground", children: "Included Formats" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-muted))] text-sm", children: product.formats })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "grid grid-cols-3 gap-3 mb-6",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.4, delay: 0.45 },
            children: detailItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "bg-[oklch(0.11_0_0)] border border-[oklch(0.19_0_0)] rounded-sm p-3 text-center",
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.5 + i * 0.08 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-cinzel text-[10px] text-gold tracking-widest uppercase mb-1", children: item.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground text-xs", children: item.value })
                ]
              },
              item.label
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "flex items-center gap-4 mb-8",
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5, delay: 0.55 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-cinzel text-4xl font-bold text-gold", children: product.priceUsd })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-col sm:flex-row gap-4",
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  onClick: handleAddToCart,
                  whileHover: {
                    scale: 1.05,
                    boxShadow: "0 0 30px oklch(0.69 0.13 75 / 0.4)"
                  },
                  whileTap: { scale: 0.97 },
                  className: "flex items-center justify-center gap-2 px-8 py-4 bg-gold text-[oklch(0.08_0_0)] font-cinzel text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[oklch(var(--gold-highlight))] transition-all duration-300",
                  "data-ocid": "product.primary_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                    "Add to Cart"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.a,
                {
                  href: `https://wa.me/919914902647?text=${waText}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  whileHover: { scale: 1.03 },
                  whileTap: { scale: 0.97 },
                  className: "flex items-center justify-center gap-2 px-8 py-4 border border-gold text-gold font-cinzel text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-gold hover:text-[oklch(0.08_0_0)] transition-all duration-300",
                  "data-ocid": "product.secondary_button",
                  children: "Order via WhatsApp"
                }
              )
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  ProductDetailPage as default
};
