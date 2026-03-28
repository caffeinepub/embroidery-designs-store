import { c as createLucideIcon, f as useActor, r as reactExports, j as jsxRuntimeExports, p as motion, P as Pen, I as Input, l as ue } from "./index-DtpdGHsa.js";
import { L as Label } from "./label-jQAdgWwS.js";
import { S as Select, d as SelectTrigger, e as SelectValue, f as SelectContent, g as SelectItem } from "./select-61glpWxo.js";
import { T as Textarea } from "./textarea-84piysW2.js";
import { C as CircleCheckBig } from "./circle-check-big-Py43TqN6.js";
import { M as MessageCircle } from "./message-circle-C0Efljlu.js";
import { C as Clock } from "./clock-D8TgiVvU.js";
import "./index-DUk-99SK.js";
import "./index-Brcepp8c.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const WA_NUMBER = "919914902647";
function CustomDesignPage() {
  const { actor } = useActor();
  const [name, setName] = reactExports.useState("");
  const [whatsapp, setWhatsapp] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [budget, setBudget] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  function openWhatsApp() {
    const msg = encodeURIComponent(
      "Hi! I want a custom embroidery design.\n\nPlease find my reference image attached below. Kindly share the price and timeline.\n\nThank you!"
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !whatsapp || !description || !budget) return;
    setLoading(true);
    try {
      if (actor) {
        await actor.submitCustomRequest(`custom-${Date.now()}`, {
          name,
          whatsapp,
          description,
          budget
        });
      }
      setSubmitted(true);
      ue.success("Request submitted successfully!");
    } catch {
      ue.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background pt-20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-4 max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-16 h-16 text-gold mx-auto mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-cinzel text-2xl font-bold text-foreground mb-4", children: "Request Received!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-secondary))] mb-6", children: "We have received your custom design request. Our team will review it and contact you on WhatsApp within 24 hours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: openWhatsApp,
          className: "flex items-center gap-2 mx-auto font-cinzel text-xs tracking-widest uppercase px-8 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
            "Chat on WhatsApp"
          ]
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pt-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[oklch(0.11_0_0)] border-b border-[oklch(0.19_0_0)] py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-xs tracking-[0.4em] text-gold uppercase mb-3", children: "Bespoke" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-foreground uppercase", children: "Custom Design" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 mx-auto w-16 h-px bg-[oklch(var(--gold-border))]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-[oklch(var(--text-secondary))] max-w-xl mx-auto", children: "Share your design picture directly on WhatsApp — we will review it and send you the price instantly." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          className: "border border-[oklch(var(--gold-border))] bg-[oklch(0.13_0_0)] rounded-sm p-8 sm:p-12 text-center relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[oklch(0.69_0.13_75/0.05)] via-transparent to-transparent pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "w-20 h-20 mx-auto rounded-full border-2 border-[oklch(var(--gold-border))] flex items-center justify-center mb-6",
                  animate: {
                    boxShadow: [
                      "0 0 0px oklch(0.69 0.13 75 / 0)",
                      "0 0 24px oklch(0.69 0.13 75 / 0.4)",
                      "0 0 0px oklch(0.69 0.13 75 / 0)"
                    ]
                  },
                  transition: {
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-8 h-8 text-gold" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-foreground uppercase mb-3", children: "Send Your Design on WhatsApp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-secondary))] max-w-lg mx-auto mb-8 leading-relaxed", children: "Tap the button below to open WhatsApp. Send us your design image or photo reference — we will review it and reply with the price and delivery time directly on chat." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  onClick: openWhatsApp,
                  whileHover: {
                    scale: 1.04,
                    boxShadow: "0 0 30px oklch(0.69 0.13 75 / 0.45)"
                  },
                  whileTap: { scale: 0.97 },
                  className: "flex items-center gap-3 font-cinzel text-sm font-bold tracking-widest uppercase px-10 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all rounded-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
                    "Send Design on WhatsApp"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 text-center", children: [
                {
                  icon: ImagePlus,
                  title: "Attach Your Image",
                  desc: "Send us any photo, sketch, or reference image"
                },
                {
                  icon: Clock,
                  title: "Get Price Instantly",
                  desc: "We reply with price and timeline within minutes"
                },
                {
                  icon: Send,
                  title: "Receive Your Design",
                  desc: "We deliver the finished file straight to WhatsApp"
                }
              ].map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-gold" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-xs font-bold tracking-widest uppercase text-foreground", children: title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-muted))] text-xs", children: desc })
              ] }, title)) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-[oklch(0.19_0_0)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-cinzel text-xs tracking-[0.3em] uppercase text-[oklch(var(--text-muted))]", children: "Or submit a written request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-[oklch(0.19_0_0)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: [
          {
            icon: Pen,
            title: "Describe Your Vision",
            desc: "Write the design concept, size, colors, and how you plan to use it."
          },
          {
            icon: Clock,
            title: "3–5 Business Days",
            desc: "Our designers will craft your unique embroidery file."
          },
          {
            icon: MessageCircle,
            title: "WhatsApp Delivery",
            desc: "All updates, revisions, and final file delivery via WhatsApp."
          }
        ].map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border border-[oklch(var(--gold-border))] flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-gold" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-cinzel text-sm font-bold tracking-wider text-foreground uppercase mb-1", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(var(--text-muted))] text-sm", children: desc })
          ] })
        ] }, title)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 border border-[oklch(0.19_0_0)] bg-[oklch(0.13_0_0)] rounded-sm p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-cinzel text-sm font-bold tracking-widest uppercase text-foreground mb-6", children: "Submit Written Request" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    placeholder: "Your name",
                    required: true,
                    className: "bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block", children: "WhatsApp" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "tel",
                    value: whatsapp,
                    onChange: (e) => setWhatsapp(e.target.value),
                    placeholder: "+91 9876543210",
                    required: true,
                    className: "bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block", children: "Design Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  placeholder: "Describe your design in detail — style, size, colors, fabric type, and intended use...",
                  required: true,
                  rows: 5,
                  className: "bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground placeholder:text-[oklch(var(--text-muted))] focus:border-gold rounded-sm resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-cinzel text-xs tracking-widest uppercase text-[oklch(var(--text-secondary))] mb-2 block", children: "Budget" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: budget, onValueChange: setBudget, required: true, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-[oklch(0.11_0_0)] border-[oklch(0.19_0_0)] text-foreground focus:border-gold rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your budget" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-[oklch(0.13_0_0)] border-[oklch(0.19_0_0)]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "under-10", children: "Under $10" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "10-25", children: "$10 – $25" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "25-50", children: "$25 – $50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "50-plus", children: "$50+" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: loading,
                className: "w-full font-cinzel text-xs tracking-widest uppercase px-6 py-4 bg-gold text-[oklch(0.08_0_0)] hover:bg-[oklch(var(--gold-highlight))] transition-all font-bold rounded-sm disabled:opacity-50 disabled:cursor-not-allowed",
                children: loading ? "Submitting..." : "Submit Request"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  CustomDesignPage as default
};
