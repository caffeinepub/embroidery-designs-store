import { r as reactExports, m as useCart, o as useRouter, f as useActor, i as useQuery, j as jsxRuntimeExports, p as motion, w as Search, I as Input, x as ShoppingCart, l as ue } from "./index-DtpdGHsa.js";
const categories = ["All", "Floral", "Logo", "Traditional", "Kids", "Custom"];
function productId(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}
function TiltCard({
  children,
  className = "",
  onClick
}) {
  const rotX = reactExports.useRef(0);
  const rotY = reactExports.useRef(0);
  const cardRef = reactExports.useRef(null);
  const [style, setStyle] = reactExports.useState({ rotateX: 0, rotateY: 0 });
  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotX.current = -dy * 10;
    rotY.current = dx * 10;
    setStyle({ rotateX: rotX.current, rotateY: rotY.current });
  }
  function handleMouseLeave() {
    setStyle({ rotateX: 0, rotateY: 0 });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref: cardRef,
      className,
      style: {
        rotateX: style.rotateX,
        rotateY: style.rotateY,
        transformPerspective: 1e3
      },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      whileHover: { scale: 1.03 },
      transition: { scale: { type: "spring", stiffness: 300, damping: 20 } },
      onClick,
      children
    }
  );
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton aspect-square w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-3 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-6 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-8 w-20 rounded-sm" })
      ] })
    ] })
  ] });
}
function ShopPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const { addItem } = useCart();
  const { navigate } = useRouter();
  const { actor, isFetching } = useActor();
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => actor.getAllProducts(),
    enabled: !!actor && !isFetching
  });
  const allProducts = productsQuery.data ?? [];
  const filtered = allProducts.filter((p) => p.active).filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = search.trim() === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const isLoading = productsQuery.isLoading || isFetching;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3", children: "Collection" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase", children: "All Designs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[oklch(var(--text-muted))] text-sm", children: "Browse our full collection of machine embroidery design files" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col sm:flex-row gap-4 mb-8",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(var(--text-muted))]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  placeholder: "Search designs...",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-9 bg-[oklch(0.13_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm",
                  "data-ocid": "shop.search_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-wrap gap-2", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                type: "button",
                onClick: () => setActiveCategory(cat),
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.97 },
                "data-ocid": "shop.filter.tab",
                className: `font-cinzel text-xs tracking-widest uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${activeCategory === cat ? "bg-gold text-[oklch(0.08_0_0)] border-gold shadow-[0_0_15px_oklch(0.69_0.13_75/0.4)]" : "border-[oklch(0.19_0_0)] text-[oklch(var(--text-secondary))] hover:border-gold hover:text-gold"}`,
                children: cat
              },
              cat
            )) })
          ]
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
          "data-ocid": "shop.loading_state",
          children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {})
            },
            id
          ))
        }
      ),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center py-20 text-[oklch(var(--text-muted))]",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          "data-ocid": "shop.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-lg", children: "No designs found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2", children: "Try a different search or category" })
          ]
        }
      ),
      !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: filtered.map((product, index) => {
        const pid = productId(product.name);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 40, scale: 0.95 },
            whileInView: { opacity: 1, y: 0, scale: 1 },
            viewport: { once: true, margin: "-30px" },
            transition: {
              duration: 0.5,
              delay: index % 4 * 0.08,
              type: "spring",
              stiffness: 120,
              damping: 14
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              TiltCard,
              {
                className: "group border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm overflow-hidden shadow-[0_2px_16px_oklch(0_0_0/0.4)] hover:border-gold hover:shadow-[0_12px_48px_oklch(0.69_0.13_75/0.25)] transition-all duration-400 cursor-pointer h-full",
                onClick: () => navigate(`/product/${pid}`),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-square", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: product.imageUrl,
                        alt: product.name,
                        loading: "lazy",
                        className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                        style: { willChange: "transform" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0_0/0.75)] via-[oklch(0.08_0_0/0.15)] to-transparent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-cinzel text-[10px] tracking-widest bg-gold text-[oklch(0.08_0_0)] px-2 py-1 uppercase", children: product.category }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-cinzel text-sm font-semibold tracking-wide text-foreground mb-1.5", children: product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-muted))] text-xs mb-4 line-clamp-2", children: product.formats }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-cinzel text-xl font-bold text-gold", children: product.priceUsd }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.button,
                        {
                          type: "button",
                          onClick: (e) => {
                            e.stopPropagation();
                            addItem({ ...product, id: pid });
                            ue.success(`${product.name} added to cart`);
                          },
                          whileHover: { scale: 1.06 },
                          whileTap: { scale: 0.92 },
                          className: "flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase px-4 py-2.5 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-colors rounded-sm shadow-[0_2px_12px_oklch(0.69_0.13_75/0.3)]",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3 h-3" }),
                            "Add"
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              }
            )
          },
          pid
        );
      }) })
    ] })
  ] });
}
export {
  ShopPage as default
};
