import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Download, Loader2, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";
import { Link, useRouter } from "../router";

function productId(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function ProductDetailPage({ id }: { id: string }) {
  const { navigate } = useRouter();
  const { addItem } = useCart();
  const { actor, isFetching } = useActor();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () => actor!.getAllProducts(),
    enabled: !!actor && !isFetching,
  });

  const product = productsQuery.data?.find((p) => productId(p.name) === id);
  const pid = product ? productId(product.name) : id;

  if (productsQuery.isLoading || isFetching) {
    return (
      <div
        className="min-h-screen bg-background pt-24 flex items-center justify-center"
        data-ocid="product.loading_state"
      >
        <Loader2 className="w-10 h-10 text-gold animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-cinzel text-gold text-xl mb-4">Design not found</p>
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="font-cinzel text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-[oklch(0.08_0_0)] transition-all rounded-sm"
          >
            Back to Shop
          </button>
        </motion.div>
      </div>
    );
  }

  const waText = encodeURIComponent(
    `Hi! I want to order: ${product.name} - ${product.priceUsd}\n\nPlease provide payment details.`,
  );

  const handleAddToCart = () => {
    addItem({ ...product, id: pid });
    toast.success(`${product.name} added to cart`);
  };

  const detailItems = [
    { label: "Category", value: product.category },
    { label: "Formats", value: product.formats },
    { label: "Delivery", value: "Instant via WhatsApp" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Breadcrumb */}
      <motion.div
        className="bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[oklch(var(--text-muted))]">
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/shop" className="hover:text-gold transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">{product.name}</span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            className="border border-[oklch(0.19_0_0)] rounded-sm overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <motion.span
              className="font-cinzel text-xs tracking-[0.3em] text-gold uppercase mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {product.category}
            </motion.span>

            <motion.h1
              className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {product.name}
            </motion.h1>

            <motion.div
              className="w-16 h-px bg-[oklch(var(--gold-border))] mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ transformOrigin: "left" }}
            />

            <motion.p
              className="text-[oklch(var(--text-secondary))] leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {product.description}
            </motion.p>

            {/* Formats */}
            <motion.div
              className="bg-[oklch(0.13_0_0)] border border-[oklch(0.19_0_0)] rounded-sm p-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-4 h-4 text-gold" />
                <span className="font-cinzel text-xs tracking-widest uppercase text-foreground">
                  Included Formats
                </span>
              </div>
              <p className="text-[oklch(var(--text-muted))] text-sm">
                {product.formats}
              </p>
            </motion.div>

            {/* Detail rows */}
            <motion.div
              className="grid grid-cols-3 gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              {detailItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="bg-[oklch(0.11_0_0)] border border-[oklch(0.19_0_0)] rounded-sm p-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                >
                  <div className="font-cinzel text-[10px] text-gold tracking-widest uppercase mb-1">
                    {item.label}
                  </div>
                  <div className="text-foreground text-xs">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Price & Buttons */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <span className="font-cinzel text-4xl font-bold text-gold">
                {product.priceUsd}
              </span>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                type="button"
                onClick={handleAddToCart}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px oklch(0.69 0.13 75 / 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gold text-[oklch(0.08_0_0)] font-cinzel text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[oklch(var(--gold-highlight))] transition-all duration-300"
                data-ocid="product.primary_button"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.button>
              <motion.a
                href={`https://wa.me/919914902647?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-gold text-gold font-cinzel text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-gold hover:text-[oklch(0.08_0_0)] transition-all duration-300"
                data-ocid="product.secondary_button"
              >
                Order via WhatsApp
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
