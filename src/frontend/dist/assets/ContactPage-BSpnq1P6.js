import { r as reactExports, j as jsxRuntimeExports, M as Mail, I as Input, l as ue } from "./index-C8XCLzn6.js";
import { L as Label } from "./label-CD8k3JH7.js";
import { T as Textarea } from "./textarea-DlhMFZ_u.js";
import { M as MessageCircle } from "./message-circle-taukZajg.js";
import { C as Clock } from "./clock-Cx_fEcRe.js";
import { C as CircleCheckBig } from "./circle-check-big-BzuCgLO7.js";
import "./index-cASxBajk.js";
function ContactPage() {
  const [form, setForm] = reactExports.useState({ name: "", email: "", message: "" });
  const [sent, setSent] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    ue.success("Message sent! We will get back to you soon.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3", children: "Support" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase", children: "Contact Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-[oklch(var(--text-secondary))] max-w-xl mx-auto", children: "We are here to help. Reach out via WhatsApp for the fastest response." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6", children: "Get in Touch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://wa.me/919914902647",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-4 group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5 text-gold group-hover:text-[oklch(0.08_0_0)] transition-colors" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-cinzel text-xs tracking-widest uppercase text-foreground mb-1", children: "WhatsApp" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[oklch(var(--text-secondary))] text-sm group-hover:text-gold transition-colors", children: "+91 9914902647" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "mailto:embroiderybusiness77@gmail.com",
                className: "flex items-center gap-4 group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-gold group-hover:text-[oklch(0.08_0_0)] transition-colors" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-cinzel text-xs tracking-widest uppercase text-foreground mb-1", children: "Email" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[oklch(var(--text-secondary))] text-sm group-hover:text-gold transition-colors", children: "embroiderybusiness77@gmail.com" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-gold" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-cinzel text-xs tracking-widest uppercase text-foreground mb-1", children: "Business Hours" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[oklch(var(--text-secondary))] text-sm", children: "Monday – Saturday: 9am – 6pm IST" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-xs tracking-widest uppercase text-gold mb-3", children: "Fastest Support" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-secondary))] text-sm leading-relaxed", children: "For the quickest response, message us directly on WhatsApp at +91 9914902647. We typically respond within 2 hours during business hours." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://wa.me/919914902647?text=Hi! I need help with my embroidery designs order.",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-block mt-4 font-cinzel text-xs tracking-widest uppercase px-6 py-3 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm font-bold",
              children: "Chat on WhatsApp"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-8", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full py-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-gold mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-cinzel text-lg font-bold text-foreground mb-2", children: "Message Sent!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-muted))] text-sm", children: "We will get back to you within 24 hours." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6", children: "Send a Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.name,
                onChange: (e) => setForm({ ...form, name: e.target.value }),
                placeholder: "Your name",
                required: true,
                className: "bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "email",
                value: form.email,
                onChange: (e) => setForm({ ...form, email: e.target.value }),
                placeholder: "your@email.com",
                required: true,
                className: "bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: form.message,
                onChange: (e) => setForm({ ...form, message: e.target.value }),
                placeholder: "How can we help you?",
                required: true,
                rows: 5,
                className: "bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "w-full font-cinzel text-xs tracking-widest uppercase px-6 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm",
              children: "Send Message"
            }
          )
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  ContactPage as default
};
