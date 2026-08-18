# DECISIONS.md

## 1. Why this design approach over the obvious alternative?

We built a **single-page React homepage** with Vite and Tailwind CSS v4 rather than a multi-page SPA or a server-rendered framework like Next.js.

**Why:** The deliverable is one home page. Adding a router or SSR framework would introduce complexity with zero benefit for this scope — more config files, more build steps, more things to explain line-by-line. A single-page app with anchor navigation keeps the footprint small (~8 components) and directs all effort toward UI craft and polish.

The product showcase is a **static JSX dashboard mock** rather than a functional prototype. The assessment asks visitors to *see* what ApplyAI does, not *use* it. A static dashboard is deterministic, fast to build, and avoids the need for backend state, making every line explainable.

**Dark mode** is implemented as a full, class-based system (`body.dark`) rather than `@media (prefers-color-scheme)` alone. This gives users explicit control via a toggle while respecting their OS preference as the default — and satisfies the assessment's "all-or-nothing" dark mode requirement.

## 2. One trade-off made under the time limit

We chose **CSS-driven scroll reveals** (IntersectionObserver + CSS transitions) over a library like Framer Motion. Framer Motion would provide richer orchestration (stagger groups, layout animations, exit transitions), but adds ~30 KB to the bundle and a learning curve for reviewers. Our approach uses zero additional dependencies, is fully explainable, and still delivers the "motion that earns its keep" requirement.

**With a full week**, we would add: (1) interactive resume-upload flow with client-side parsing, (2) localStorage persistence so the demo dashboard feels alive across sessions, (3) richer scroll-triggered stat counter animations, and (4) a refined responsive breakpoint pass between 390px and 1440px.

## 3. Where AI tools were used and what was personally verified

AI assistance was used for:
- Component scaffolding and Tailwind class composition
- Initial dark-mode override strategy in CSS
- Structuring the Konami Code easter egg logic
- Writing and refining this documentation

**Personally reviewed and verified:**
- Every component was read line-by-line, understood, and tested in the browser
- Responsive behavior was tested at 390px mobile and 1440px desktop — no horizontal scroll
- Dark mode was toggled and verified across all sections — colors, borders, text all invert correctly
- All CTA buttons, navigation links, mobile menu, and auth modals were manually tested
- **No fabricated testimonials, fake user counts, or fake logos** — all copy is honest and compelling without invented social proof
- The Konami Code easter egg was tested and verified (↑↑↓↓←→←→BA)
