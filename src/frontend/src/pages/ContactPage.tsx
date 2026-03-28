import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We will get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Support
          </p>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase">
            Contact Us
          </h1>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
          <p className="mt-6 text-[oklch(var(--text-secondary))] max-w-xl mx-auto">
            We are here to help. Reach out via WhatsApp for the fastest
            response.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <a
                  href="https://wa.me/919914902647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all">
                    <MessageCircle className="w-5 h-5 text-gold group-hover:text-[oklch(0.08_0_0)] transition-colors" />
                  </div>
                  <div>
                    <div className="font-cinzel text-xs tracking-widest uppercase text-foreground mb-1">
                      WhatsApp
                    </div>
                    <div className="text-[oklch(var(--text-secondary))] text-sm group-hover:text-gold transition-colors">
                      +91 9914902647
                    </div>
                  </div>
                </a>
                <a
                  href="mailto:embroiderybusiness77@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all">
                    <Mail className="w-5 h-5 text-gold group-hover:text-[oklch(0.08_0_0)] transition-colors" />
                  </div>
                  <div>
                    <div className="font-cinzel text-xs tracking-widest uppercase text-foreground mb-1">
                      Email
                    </div>
                    <div className="text-[oklch(var(--text-secondary))] text-sm group-hover:text-gold transition-colors">
                      embroiderybusiness77@gmail.com
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-cinzel text-xs tracking-widest uppercase text-foreground mb-1">
                      Business Hours
                    </div>
                    <div className="text-[oklch(var(--text-secondary))] text-sm">
                      Monday – Saturday: 9am – 6pm IST
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-6">
              <p className="font-cinzel text-xs tracking-widest uppercase text-gold mb-3">
                Fastest Support
              </p>
              <p className="text-[oklch(var(--text-secondary))] text-sm leading-relaxed">
                For the quickest response, message us directly on WhatsApp at
                +91 9914902647. We typically respond within 2 hours during
                business hours.
              </p>
              <a
                href="https://wa.me/919914902647?text=Hi! I need help with my embroidery designs order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-cinzel text-xs tracking-widest uppercase px-6 py-3 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm font-bold"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <CheckCircle className="w-12 h-12 text-gold mb-4" />
                <h3 className="font-cinzel text-lg font-bold text-foreground mb-2">
                  Message Sent!
                </h3>
                <p className="text-[oklch(var(--text-muted))] text-sm">
                  We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                      Name
                    </Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Your name"
                      required
                      className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
                    />
                  </div>
                  <div>
                    <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      required
                      className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
                    />
                  </div>
                  <div>
                    <Label className="font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block">
                      Message
                    </Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="How can we help you?"
                      required
                      rows={5}
                      className="bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full font-cinzel text-xs tracking-widest uppercase px-6 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
