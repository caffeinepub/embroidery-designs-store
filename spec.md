# Embroidery Designs Store

## Current State
Fully implemented e-commerce site with Home, Shop, Product Detail, Cart, Checkout, Admin, Custom Design, How It Works, Contact, FAQ pages. Dark/gold/white palette. Animations exist but may be janky or slow. Lazy loading is implemented.

## Requested Changes (Diff)

### Add
- GPU-accelerated animation utilities using `transform` and `opacity` only (never `top/left/width/height`)
- `will-change: transform` on animated elements
- Intersection Observer-based reveal animations (fade-up, fade-in) for content sections
- Smooth page transition animation (fade)
- Floating WhatsApp button on all pages
- Skeleton loading states for product cards
- Optimized CSS custom properties for animation timing
- Image lazy loading with `loading="lazy"` attributes

### Modify
- Replace any JS-driven layout animations with CSS transitions
- Tighten animation durations (hero: 0.8s, cards: 0.5s, page transitions: 0.3s)
- Use `cubic-bezier(0.4, 0, 0.2, 1)` easing for all transitions (material smooth)
- Product cards: silky hover effect with scale + shadow using transform only
- Hero section: cinematic entrance with staggered fade-up
- Navigation: smooth backdrop-blur transition on scroll
- Testimonials: smoother auto-scroll
- All buttons: magnetic-style hover with transform scale
- index.css: add optimized keyframes, reduce layout thrash

### Remove
- Any `setTimeout`-based animation hacks
- Animations that use `margin`, `padding`, or positional properties as transition targets

## Implementation Plan
1. Update `index.css` with optimized keyframes, animation tokens, GPU-acceleration utilities
2. Rewrite App.tsx to add smooth page transitions and floating WhatsApp button
3. Update HomePage sections (Hero, Categories, Best Sellers, Testimonials) with intersection observer reveals and tighter animations
4. Update ShopPage product cards with silky hover states and skeleton loading
5. Update all remaining pages with consistent reveal animations
6. Ensure all images use loading="lazy"
