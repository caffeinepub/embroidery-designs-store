import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  BadgeCheck,
  Download,
  Facebook,
  Flower2,
  Headphones,
  Heart,
  Instagram,
  Mail,
  Menu,
  Pen,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star as StarIcon,
  Twitter,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Toaster } from "sonner";
import { CartProvider, useCart } from "./context/CartContext";
import { useActor } from "./hooks/useActor";
const AdminPage = React.lazy(() => import("./pages/AdminPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const CustomDesignPage = React.lazy(() => import("./pages/CustomDesignPage"));
const FAQPage = React.lazy(() => import("./pages/FAQPage"));
const HowItWorksPage = React.lazy(() => import("./pages/HowItWorksPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
import { Link, RouterProvider, useRouter } from "./router";

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  { id: 1, name: "Floral", icon: Flower2, desc: "Botanical & bloom designs" },
  { id: 2, name: "Logo", icon: BadgeCheck, desc: "Monogram & brand marks" },
  {
    id: 3,
    name: "Traditional",
    icon: StarIcon,
    desc: "Heritage & classic patterns",
  },
  { id: 4, name: "Kids", icon: Heart, desc: "Playful & cute characters" },
  { id: 5, name: "Custom", icon: Pen, desc: "Your design, our craft" },
];

const trustBadges = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Secure Checkout",
    desc: "256-bit SSL encryption on every transaction",
  },
  {
    id: 2,
    icon: Download,
    title: "Instant Download",
    desc: "Access your files immediately after purchase",
  },
  {
    id: 3,
    icon: Headphones,
    title: "Premium Support",
    desc: "Expert help available 7 days a week",
  },
  {
    id: 4,
    icon: Award,
    title: "100% Quality",
    desc: "Machine-tested designs for perfect stitching",
  },
];

const testimonials = [
  {
    id: 1,
    initials: "SM",
    quote:
      "Absolutely stunning designs! My clients are always amazed by the quality. These files work perfectly with every machine I own.",
    name: "Sarah M.",
    role: "Boutique Owner",
    location: "New York",
  },
  {
    id: 2,
    initials: "RP",
    quote:
      "Best embroidery design store I've found online. Instant download, perfect stitching every time. Highly recommended!",
    name: "Raj P.",
    role: "Fashion Designer",
    location: "London",
  },
  {
    id: 3,
    initials: "AK",
    quote:
      "The custom designs are worth every penny. Professional, fast, and the formats are compatible with all my machines.",
    name: "Aisha K.",
    role: "Craft Studio Owner",
    location: "Dubai",
  },
  {
    id: 4,
    initials: "ML",
    quote:
      "I've ordered over 50 designs and each one stitches out beautifully. The golden rose collection is breathtaking!",
    name: "Maria L.",
    role: "Embroidery Artist",
    location: "Barcelona",
  },
  {
    id: 5,
    initials: "TK",
    quote:
      "Fast delivery via WhatsApp, incredible quality. My boutique customers can't stop asking about the embroidery work.",
    name: "Tariq K.",
    role: "Fashion Boutique Owner",
    location: "Karachi",
  },
  {
    id: 6,
    initials: "NG",
    quote:
      "The traditional patterns are incredibly detailed. Perfect for my cultural wear line. Outstanding value.",
    name: "Nadia G.",
    role: "Cultural Fashion Designer",
    location: "Istanbul",
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:embroiderybusiness77@gmail.com", label: "Email" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

// ─── Sub-components ───────────────────────────────────────────────────────────

const STAR_KEYS = ["star-1", "star-2", "star-3", "star-4", "star-5"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_KEYS.map((key, i) => (
        <StarIcon
          key={key}
          className={`w-3.5 h-3.5 ${
            i < Math.floor(rating)
              ? "text-gold fill-current"
              : i < rating
                ? "text-gold fill-current opacity-50"
                : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 4,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 4 + Math.random() * 8,
  delay: Math.random() * 6,
  color:
    i % 3 === 0
      ? "oklch(0.85 0.1 80)"
      : i % 3 === 1
        ? "oklch(0.69 0.13 75)"
        : "oklch(0.55 0.12 70)",
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Tilt Card ────────────────────────────────────────────────────────────────

function TiltCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 });
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(dx * 12);
    rotateX.set(-dy * 12);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
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

// ─── Magnetic Button ──────────────────────────────────────────────────────────

function MagneticButton({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={btnRef}
      type={type}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { navigate } = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Custom", href: "/custom" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.08_0_0/0.97)] backdrop-blur-md border-b border-[oklch(0.19_0_0)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <motion.span
              className="font-cinzel text-lg font-bold tracking-widest shimmer-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              EMBROIDERY
            </motion.span>
            <motion.span
              className="hidden sm:block font-cinzel text-lg font-bold tracking-widest text-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              DESIGNS
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 + 0.2 }}
              >
                <Link
                  to={link.href}
                  className="font-cinzel text-xs tracking-widest text-[oklch(var(--text-secondary))] hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Utility */}
          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              className="text-[oklch(var(--text-secondary))] hover:text-gold transition-colors"
              aria-label="Search"
              onClick={() => navigate("/shop")}
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <motion.button
              type="button"
              className="relative text-[oklch(var(--text-secondary))] hover:text-gold transition-colors"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-[oklch(0.08_0_0)] text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <button
              type="button"
              className="lg:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)]"
          >
            <nav className="flex flex-col px-4 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-cinzel text-xs tracking-widest text-[oklch(var(--text-secondary))] hover:text-gold transition-colors py-2 border-b border-[oklch(0.19_0_0)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { navigate } = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="/assets/generated/hero-embroidery.dim_1400x800.jpg"
          alt="Premium embroidery designs"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0_0/0.75)] via-[oklch(0.08_0_0/0.6)] to-[oklch(0.08_0_0/0.95)]" />
      </motion.div>

      <FloatingParticles />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold mb-6 uppercase">
            Trusted by 10,000+ Embroidery Professionals
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-foreground leading-tight mb-6"
        >
          Premium Embroidery
          <br />
          <span className="gradient-gold-text">Designs</span> for Professionals
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-[oklch(var(--text-secondary))] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Instant download, high-quality machine-ready files in DST, PES, JEF
          &amp; EXP formats. Elevate your craft with designs built for
          precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            onClick={() => navigate("/shop")}
            className="group relative px-10 py-4 bg-gold text-[oklch(0.08_0_0)] font-cinzel text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[oklch(var(--gold-highlight))] transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.69_0.13_75/0.5)]"
          >
            Shop Now
          </MagneticButton>
          <MagneticButton
            onClick={() => navigate("/how-it-works")}
            className="px-10 py-4 border border-gold text-gold font-cinzel text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-gold hover:text-[oklch(0.08_0_0)] transition-all duration-300"
          >
            How It Works
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { value: "5,000+", label: "Designs" },
            { value: "10K+", label: "Happy Customers" },
            { value: "All Formats", label: "DST · PES · JEF · EXP" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + i * 0.15 }}
            >
              <div className="font-cinzel text-2xl font-bold shimmer-text">
                {stat.value}
              </div>
              <div className="text-[oklch(var(--text-muted))] text-xs tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(var(--gold-border))] to-transparent" />

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-[oklch(var(--gold-border))] rounded-full flex items-start justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-gold rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────

function Categories() {
  const { navigate } = useRouter();

  return (
    <section id="categories" className="py-24 bg-[oklch(0.11_0_0)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Explore
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase">
            Browse Categories
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
        </SectionReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => navigate("/shop")}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
                whileHover={{
                  y: -8,
                  borderColor: "oklch(0.69 0.13 75)",
                  boxShadow: "0 8px 30px oklch(0.69 0.13 75 / 0.25)",
                }}
                className="group cursor-pointer border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-6 flex flex-col items-center text-center transition-colors duration-300"
              >
                <motion.div
                  className="w-12 h-12 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center mb-4 group-hover:bg-gold group-hover:border-gold transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-5 h-5 text-gold group-hover:text-[oklch(0.08_0_0)] transition-colors duration-300" />
                </motion.div>
                <h3 className="font-cinzel text-sm font-semibold tracking-wider text-foreground uppercase mb-1">
                  {cat.name}
                </h3>
                <p className="text-[oklch(var(--text-muted))] text-xs">
                  {cat.desc}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Best Sellers ─────────────────────────────────────────────────────────────

function BestSellers() {
  const { addItem } = useCart();
  const { navigate } = useRouter();
  const { actor } = useActor();
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["best-sellers"],
    queryFn: () => actor!.getAllProducts(),
    enabled: !!actor,
  });
  const bestSellerProducts = allProducts.filter((p) => p.isBestSeller);

  return (
    <section id="shop" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Top Picks
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase">
            Best Sellers
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
        </SectionReveal>

        {isLoading ? (
          <div
            className="flex justify-center py-16"
            data-ocid="best_sellers.loading_state"
          >
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : bestSellerProducts.length === 0 ? (
          <div
            className="text-center py-16 text-[oklch(var(--text-muted))]"
            data-ocid="best_sellers.empty_state"
          >
            <p className="font-cinzel text-sm tracking-widest uppercase">
              New designs coming soon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellerProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <TiltCard
                  className="group border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm overflow-hidden hover:border-gold hover:shadow-[0_8px_40px_oklch(0.69_0.13_75/0.2)] transition-colors duration-300 cursor-pointer h-full"
                  onClick={() => navigate(`/product/product-${i}`)}
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
                    {/* Shimmer overlay */}
                    <motion.div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[oklch(0.85_0.1_80/0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-4">
                    <h3 className="font-cinzel text-sm font-semibold tracking-wide text-foreground mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={5} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-lg font-bold text-gold">
                        {product.priceUsd}
                      </span>
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem({
                            id: `product-${i}`,
                            name: product.name,
                            priceUsd: product.priceUsd,
                            category: product.category,
                            imageUrl: product.imageUrl,
                            formats: product.formats,
                            description: product.description,
                          });
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="font-cinzel text-[10px] tracking-widest uppercase px-3 py-2 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-colors duration-200 rounded-sm"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}

        <SectionReveal className="text-center mt-10">
          <MagneticButton
            onClick={() => navigate("/shop")}
            className="font-cinzel text-xs tracking-widest uppercase px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-[oklch(0.08_0_0)] transition-all duration-300 rounded-sm"
          >
            View All Designs
          </MagneticButton>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── Trust ────────────────────────────────────────────────────────────────────

function TrustSection() {
  return (
    <section className="py-24 bg-[oklch(0.11_0_0)] border-y border-[oklch(0.19_0_0)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Why Us
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase">
            Trust &amp; Quality
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div
                  className="w-16 h-16 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center mb-5 glow-ring"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Icon className="w-6 h-6 text-gold" />
                </motion.div>
                <h3 className="font-cinzel text-sm font-bold tracking-wider text-foreground uppercase mb-2">
                  {badge.title}
                </h3>
                <p className="text-[oklch(var(--text-muted))] text-sm leading-relaxed">
                  {badge.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials (Marquee) ───────────────────────────────────────────────────

function Testimonials() {
  const [paused, setPaused] = useState(false);

  const allCards = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-14">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Reviews
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase">
            Client Testimonials
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
        </SectionReveal>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6"
          animate={{ x: paused ? undefined : ["-0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ width: "max-content" }}
        >
          {allCards.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="w-80 flex-shrink-0 border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-8 text-center"
            >
              <div className="font-cinzel text-5xl text-gold leading-none mb-4 opacity-40">
                &ldquo;
              </div>
              <div className="flex justify-center mb-4">
                <StarRating rating={5} />
              </div>
              <p className="text-[oklch(var(--text-secondary))] text-sm leading-relaxed mb-6 italic">
                {t.quote}
              </p>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[oklch(0.19_0_0)] border-2 border-[oklch(var(--gold-border))] flex items-center justify-center mb-3">
                  <span className="font-cinzel text-sm font-bold text-gold">
                    {t.initials}
                  </span>
                </div>
                <p className="font-cinzel text-sm font-semibold text-foreground tracking-wider">
                  {t.name}
                </p>
                <p className="text-[oklch(var(--text-muted))] text-xs mt-0.5">
                  {t.role}
                </p>
                <p className="text-gold text-xs tracking-widest mt-0.5">
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="py-20 bg-[oklch(0.11_0_0)] border-y border-[oklch(0.19_0_0)]">
      <SectionReveal className="max-w-2xl mx-auto px-4 text-center">
        <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
          Stay Updated
        </p>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-foreground uppercase mb-4">
          Join Our Newsletter
        </h2>
        <p className="text-[oklch(var(--text-muted))] text-sm mb-8">
          Get exclusive deals, new design drops, and embroidery tips directly in
          your inbox.
        </p>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-cinzel text-gold tracking-wider"
            >
              ✓ Thank you for subscribing!
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-[oklch(0.13_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold focus:ring-gold rounded-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="font-cinzel text-xs tracking-widest uppercase px-6 py-3 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-colors duration-200 rounded-sm font-bold whitespace-nowrap"
              >
                Sign Up
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </SectionReveal>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    { label: "Custom Orders", href: "/custom" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact Us", href: "/contact" },
  ];

  const supportLinks = [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Custom Design", href: "/custom" },
  ];

  return (
    <footer className="bg-[oklch(0.08_0_0)] border-t-2 border-[oklch(var(--gold-border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="font-cinzel text-lg font-bold tracking-widest mb-1">
              <span className="shimmer-text">EMBROIDERY</span>
              <span className="text-foreground"> DESIGNS</span>
            </div>
            <p className="text-[oklch(var(--text-muted))] text-sm leading-relaxed mt-4">
              Premium machine embroidery designs for professionals. Instant
              downloads in all major formats.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[oklch(0.19_0_0)] rounded-full flex items-center justify-center text-[oklch(var(--text-muted))] hover:border-gold hover:text-gold transition-all duration-200"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-xs font-bold tracking-widest text-foreground uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[oklch(var(--text-muted))] text-sm hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-cinzel text-xs font-bold tracking-widest text-foreground uppercase mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[oklch(var(--text-muted))] text-sm hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel text-xs font-bold tracking-widest text-foreground uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-3 text-[oklch(var(--text-muted))] text-sm">
              <li>support@embroiderydesigns.com</li>
              <li>Mon &ndash; Sat: 9am &ndash; 6pm</li>
              <li className="pt-2">
                <a
                  href="https://wa.me/919914902647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline font-cinzel text-xs tracking-widest uppercase"
                >
                  WhatsApp: +91 9914902647
                </a>
              </li>
              <li className="pt-2">
                <span className="text-gold font-cinzel text-xs tracking-widest uppercase">
                  Accepted Formats
                </span>
                <p className="mt-1">DST · PES · JEF · EXP · XXX · VP3</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[oklch(0.19_0_0)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[oklch(var(--text-muted))] text-xs">
            &copy; {year} Embroidery Designs. All rights reserved.
          </p>
          <p className="text-[oklch(var(--text-muted))] text-xs">
            Made by <span className="text-gold">HS_Boyz</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <BestSellers />
      <TrustSection />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

function AppRouter() {
  const { path } = useRouter();

  const getProductId = () => {
    const match = path.match(/^\/product\/(.+)$/);
    return match ? match[1] : "";
  };

  const renderPage = () => {
    if (path === "/" || path === "") return <HomePage />;
    if (path === "/shop") return <ShopPage />;
    if (path.startsWith("/product/"))
      return <ProductDetailPage id={getProductId()} />;
    if (path === "/cart") return <CartPage />;
    if (path === "/checkout") return <CheckoutPage />;
    if (path === "/how-it-works") return <HowItWorksPage />;
    if (path === "/custom") return <CustomDesignPage />;
    if (path === "/contact") return <ContactPage />;
    if (path === "/faq") return <FAQPage />;
    if (path === "/admin") return <AdminPage />;
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="font-cinzel text-4xl font-bold text-gold mb-4">404</p>
          <p className="text-[oklch(var(--text-muted))] mb-8">Page not found</p>
          <button
            type="button"
            onClick={() => {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
            className="font-cinzel text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-[oklch(0.08_0_0)] transition-all rounded-sm"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <Suspense
            fallback={
              <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            {renderPage()}
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <Toaster richColors position="bottom-right" theme="dark" />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </RouterProvider>
  );
}
