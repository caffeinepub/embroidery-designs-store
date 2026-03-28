import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";
import { useRouter } from "../router";

const categories = ["All", "Floral", "Logo", "Traditional", "Kids", "Custom"];

function productId(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function TiltCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const rotX = useRef(0);
  const rotY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
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

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX: style.rotateX,
        rotateY: style.rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { addItem } = useCart();
  const { navigate } = useRouter();
  const { actor, isFetching } = useActor();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => actor!.getAllProducts(),
    enabled: !!actor && !isFetching,
  });

  const allProducts = productsQuery.data ?? [];

  const filtered = allProducts
    .filter((p) => p.active)
    .filter((p) => {
      const matchCat =
        activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });

  const isLoading = productsQuery.isLoading || isFetching;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-12">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Collection
          </p>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase">
            All Designs
          </h1>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
          <p className="mt-4 text-[oklch(var(--text-muted))] text-sm">
            Browse our full collection of machine embroidery design files
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(var(--text-muted))]" />
            <Input
              placeholder="Search designs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-[oklch(0.13_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
              data-ocid="shop.search_input"
            />
          </div>
          <div className="relative flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                data-ocid="shop.filter.tab"
                className={`font-cinzel text-xs tracking-widest uppercase px-4 py-2 rounded-sm border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gold text-[oklch(0.08_0_0)] border-gold shadow-[0_0_15px_oklch(0.69_0.13_75/0.4)]"
                    : "border-[oklch(0.19_0_0)] text-[oklch(var(--text-secondary))] hover:border-gold hover:text-gold"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <motion.div
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="shop.loading_state"
          >
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </motion.div>
        )}

        {/* Empty */}
        {!isLoading && filtered.length === 0 && (
          <motion.div
            className="text-center py-20 text-[oklch(var(--text-muted))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="shop.empty_state"
          >
            <p className="font-cinzel text-lg">No designs found</p>
            <p className="text-sm mt-2">Try a different search or category</p>
          </motion.div>
        )}

        {/* Grid */}
        {!isLoading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, index) => {
              const pid = productId(product.name);
              return (
                <motion.div
                  key={pid}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 4) * 0.08,
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                  }}
                >
                  <TiltCard
                    className="group border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm overflow-hidden hover:border-gold hover:shadow-[0_8px_40px_oklch(0.69_0.13_75/0.15)] transition-colors duration-300 cursor-pointer h-full"
                    onClick={() => navigate(`/product/${pid}`)}
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="font-cinzel text-[10px] tracking-widest bg-gold text-[oklch(0.08_0_0)] px-2 py-1 uppercase">
                          {product.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0_0/0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-cinzel text-sm font-semibold tracking-wide text-foreground mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[oklch(var(--text-muted))] text-xs mb-3 line-clamp-2">
                        {product.formats}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel text-lg font-bold text-gold">
                          {product.priceUsd}
                        </span>
                        <motion.button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem({ ...product, id: pid });
                            toast.success(`${product.name} added to cart`);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.92 }}
                          className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase px-3 py-2 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-colors rounded-sm"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Add
                        </motion.button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
