import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What file formats are included with each design?",
    a: "Most designs include DST, PES, JEF, and EXP formats. Some designs also include XXX and VP3. The included formats are listed on each product page.",
  },
  {
    q: "Which embroidery machines are compatible?",
    a: "Our designs work with all major embroidery machines including Brother, Janome, Bernina, Husqvarna Viking, Pfaff, Tajima, Melco, Singer, and many more. We cover 99% of home and commercial machines.",
  },
  {
    q: "How do I receive my design files?",
    a: "After you confirm your order and payment via WhatsApp, we send your design files directly through WhatsApp in the formats you need. Delivery is typically within 1–2 hours during business hours.",
  },
  {
    q: "How does the WhatsApp ordering process work?",
    a: "Add designs to your cart, go to checkout, enter your name and WhatsApp number, and click 'Confirm Order on WhatsApp'. This opens WhatsApp with a pre-filled message. We reply with payment details, and once confirmed, send your files.",
  },
  {
    q: "What is your refund policy?",
    a: "Because our products are digital files, we do not accept returns or provide refunds after files are delivered. However, if a file is corrupted or does not work with your machine, contact us on WhatsApp and we will fix it free of charge.",
  },
  {
    q: "Can I use the designs commercially?",
    a: "Yes, our designs can be used commercially — on products you sell, for client orders, and for your business. You may not resell or redistribute the design files themselves.",
  },
  {
    q: "How do I request a custom embroidery design?",
    a: "Go to our Custom Design page, describe your vision (size, style, colors, fabric), enter your WhatsApp number, and submit. Our team will review and contact you within 24 hours. Typical turnaround is 3–5 business days.",
  },
  {
    q: "What is the quality standard of your designs?",
    a: "All designs are machine-tested for stitch density, underlay, and color sequence. We optimize for minimum jumps and clean pull compensation to ensure perfect results on the first run.",
  },
  {
    q: "Do you offer discounts for bulk orders?",
    a: "Yes! Contact us on WhatsApp with a list of designs you need. We offer bundle pricing and discounts for orders of 5 or more designs.",
  },
  {
    q: "Can I request changes to an existing design?",
    a: "Yes, we offer customization on any existing design — resizing, color changes, adding text, etc. Use the Custom Design form or contact us directly on WhatsApp.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3">
            Help
          </p>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase">
            Frequently Asked Questions
          </h1>
          <div className="mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={`faq-${i + 1}`}
              value={`faq-${i + 1}`}
              className="border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm px-6 data-[state=open]:border-gold transition-colors"
            >
              <AccordionTrigger className="font-cinzel text-sm tracking-wide text-foreground hover:text-gold hover:no-underline py-5 text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[oklch(var(--text-secondary))] text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 border border-[oklch(var(--gold-border))] bg-[oklch(0.13_0_0)] rounded-sm p-8 text-center">
          <p className="font-cinzel text-sm font-bold tracking-wider text-foreground uppercase mb-3">
            Still Have Questions?
          </p>
          <p className="text-[oklch(var(--text-muted))] text-sm mb-6">
            Our support team is available Mon–Sat, 9am–6pm IST
          </p>
          <a
            href="https://wa.me/919914902647?text=Hi! I have a question about your embroidery designs."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-cinzel text-xs tracking-widest uppercase px-8 py-3 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm font-bold"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
