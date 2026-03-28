import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Clock,
  ImagePlus,
  MessageCircle,
  Pen,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const WA_NUMBER = "919914902647";

export default function CustomDesignPage() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function openWhatsApp() {
    const msg = encodeURIComponent(
      "Hi! I want a custom embroidery design.\n\nPlease find my reference image attached below. Kindly share the price and timeline.\n\nThank you!",
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp || !description || !budget) return;
    setLoading(true);
    try {
      if (actor) {
        await actor.submitCustomRequest(`custom-${Date.now()}`, {
          name,
          whatsapp,
          description,
          budget,
        });
      }
      setSubmitted(true);
      toast.success("Request submitted successfully!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="font-cinzel text-2xl font-bold text-foreground mb-4">
            Request Received!
          </h2>
          <p className="text-[oklch(var(--text-secondary))] mb-6">
            We have received your custom design request. Our team will review it
            and contact you on WhatsApp within 24 hours.
          </p>
          <button
            type="button"
            onClick={openWhatsApp}
            className="flex items-center gap-2 mx-auto font-cinzel text-xs tracking-widest uppercase px-8 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Bespoke
          </p>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase">
            Custom Design
          </h1>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
          <p className="mt-6 text-[oklch(var(--text-secondary))] max-w-xl mx-auto">
            Share your design picture directly on WhatsApp — we will review it
            and send you the price instantly.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* PRIMARY: WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border border-[oklch(var(--gold-border))] bg-[oklch(0.13_0_0)] rounded-sm p-8 sm:p-12 text-center relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.69_0.13_75/0.05)] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              className="w-20 h-20 mx-auto rounded-full border-2 border-[oklch(var(--gold-border))] flex items-center justify-center mb-6"
              animate={{
                boxShadow: [
                  "0 0 0px oklch(0.69 0.13 75 / 0)",
                  "0 0 24px oklch(0.69 0.13 75 / 0.4)",
                  "0 0 0px oklch(0.69 0.13 75 / 0)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <ImagePlus className="w-8 h-8 text-gold" />
            </motion.div>

            <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-foreground uppercase mb-3">
              Send Your Design on WhatsApp
            </h2>
            <p className="text-[oklch(var(--text-secondary))] max-w-lg mx-auto mb-8 leading-relaxed">
              Tap the button below to open WhatsApp. Send us your design image
              or photo reference — we will review it and reply with the price
              and delivery time directly on chat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <motion.button
                type="button"
                onClick={openWhatsApp}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 30px oklch(0.69 0.13 75 / 0.45)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 font-cinzel text-sm font-bold tracking-widest uppercase px-10 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Send Design on WhatsApp
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: ImagePlus,
                  title: "Attach Your Image",
                  desc: "Send us any photo, sketch, or reference image",
                },
                {
                  icon: Clock,
                  title: "Get Price Instantly",
                  desc: "We reply with price and timeline within minutes",
                },
                {
                  icon: Send,
                  title: "Receive Your Design",
                  desc: "We deliver the finished file straight to WhatsApp",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <p className="font-cinzel text-xs font-bold tracking-widest uppercase text-foreground">
                    {title}
                  </p>
                  <p className="text-[oklch(var(--text-muted))] text-xs">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[oklch(0.19_0_0)]" />
          <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-[oklch(var(--text-muted))]">
            Or submit a written request
          </p>
          <div className="flex-1 h-px bg-[oklch(0.19_0_0)]" />
        </div>

        {/* SECONDARY: Text form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info */}
          <div className="space-y-8">
            {[
              {
                icon: Pen,
                title: "Describe Your Vision",
                desc: "Write the design concept, size, colors, and how you plan to use it.",
              },
              {
                icon: Clock,
                title: "3–5 Business Days",
                desc: "Our designers will craft your unique embroidery file.",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp Delivery",
                desc: "All updates, revisions, and final file delivery via WhatsApp.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-cinzel text-sm font-bold tracking-wider text-foreground uppercase mb-1">
                    {title}
                  </h3>
                  <p className="text-[oklch(var(--text-muted))] text-sm">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-8">
            <h2 className="font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6">
              Submit Written Request
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                    Name
                  </Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
                  />
                </div>
                <div>
                  <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                    WhatsApp
                  </Label>
                  <Input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+91 9876543210"
                    required
                    className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
                  />
                </div>
              </div>
              <div>
                <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                  Design Description
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your design in detail — style, size, colors, fabric type, and intended use..."
                  required
                  rows={5}
                  className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm resize-none"
                />
              </div>
              <div>
                <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                  Budget
                </Label>
                <Select value={budget} onValueChange={setBudget} required>
                  <SelectTrigger className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm">
                    <SelectValue placeholder="Select your budget" />
                  </SelectTrigger>
                  <SelectContent className="bg-[oklch(0.13_0_0)] border-[oklch(0.19_0_0)]">
                    <SelectItem value="under-10">Under $10</SelectItem>
                    <SelectItem value="10-25">$10 – $25</SelectItem>
                    <SelectItem value="25-50">$25 – $50</SelectItem>
                    <SelectItem value="50-plus">$50+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full font-cinzel text-xs tracking-widest uppercase px-6 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
