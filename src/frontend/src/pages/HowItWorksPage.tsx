import { Download, MessageCircle, Search, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Browse & Select",
    desc: "Explore our collection of 5,000+ premium embroidery designs. Filter by category, search by name, or browse best sellers.",
  },
  {
    num: "02",
    icon: ShoppingCart,
    title: "Add to Cart",
    desc: "Add your chosen designs to the cart. Review your selection, adjust quantities, and check the order summary before proceeding.",
  },
  {
    num: "03",
    icon: MessageCircle,
    title: "Confirm on WhatsApp",
    desc: "At checkout, enter your name and WhatsApp number. A pre-filled message with your order details will open in WhatsApp. We will confirm payment and provide details.",
  },
  {
    num: "04",
    icon: Download,
    title: "Receive Your Files",
    desc: "After payment confirmation, we send your design files directly via WhatsApp in DST, PES, JEF, EXP, and other formats compatible with all major embroidery machines.",
  },
];

const formats = [
  { name: "DST", desc: "Tajima format — universal standard" },
  { name: "PES", desc: "Brother / Babylock machines" },
  { name: "JEF", desc: "Janome machines" },
  { name: "EXP", desc: "Melco / Bernina machines" },
  { name: "XXX", desc: "Singer machines" },
  { name: "VP3", desc: "Husqvarna Viking / Pfaff" },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <motion.div
        className="bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.p
            className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Process
          </motion.p>
          <motion.h1
            className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            How It Works
          </motion.h1>
          <motion.div
            className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ transformOrigin: "center" }}
          />
          <motion.p
            className="mt-6 text-[oklch(var(--text-secondary))] max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Getting premium embroidery designs has never been easier. Follow
            these four simple steps.
          </motion.p>
        </div>
      </motion.div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 14,
                }}
              >
                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-10 h-px bg-[oklch(var(--gold-border))] -translate-y-1/2 z-0"
                    style={{
                      left: "5rem",
                      width: "calc(100% - 5rem)",
                      transformOrigin: "left",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15 + 0.4 }}
                  />
                )}
                <div className="relative z-10 text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-full border-2 border-[oklch(var(--gold-border))] flex items-center justify-center mb-6 bg-[oklch(0.13_0_0)]"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.15 + 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    whileHover={{
                      rotate: 360,
                      borderColor: "oklch(0.69 0.13 75)",
                    }}
                  >
                    <Icon className="w-7 h-7 text-gold" />
                  </motion.div>

                  <motion.div
                    className="font-cinzel text-4xl font-bold text-gold mb-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.15 + 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    style={{ opacity: 0.25 }}
                  >
                    {step.num}
                  </motion.div>

                  <h3 className="font-cinzel text-sm font-bold tracking-wider text-foreground uppercase mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[oklch(var(--text-muted))] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Formats */}
      <div className="bg-[oklch(0.11_0_0)] border-y border-[oklch(0.19_0_0)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
              Files
            </p>
            <h2 className="font-cinzel text-2xl font-bold tracking-wider text-foreground uppercase">
              Supported Formats
            </h2>
            <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {formats.map((f, i) => (
              <motion.div
                key={f.name}
                className="border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-4 text-center"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                }}
                whileHover={{
                  borderColor: "oklch(0.69 0.13 75)",
                  boxShadow: "0 0 20px oklch(0.69 0.13 75 / 0.2)",
                  y: -4,
                }}
              >
                <div className="font-cinzel text-xl font-bold shimmer-text mb-2">
                  {f.name}
                </div>
                <p className="text-[oklch(var(--text-muted))] text-xs">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="py-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-cinzel text-2xl font-bold tracking-wider text-foreground mb-6">
          Ready to Get Started?
        </h2>
        <motion.a
          href="/shop"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, "", "/shop");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px oklch(0.69 0.13 75 / 0.4)",
          }}
          whileTap={{ scale: 0.97 }}
          className="inline-block font-cinzel text-xs tracking-widest uppercase px-10 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm font-bold"
        >
          Browse Designs
        </motion.a>
      </motion.div>
    </div>
  );
}
