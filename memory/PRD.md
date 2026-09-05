# PRD — Precitech Engineering (Precision Manufacturing Website Prototype)

## Original Problem Statement
Premium static website prototype for an established Indian precision manufacturing company (30+ years) serving JCB/heavy equipment, railways, pharmaceutical machinery, and industrial engineering. Dark industrial aesthetic (charcoal, off-white, steel gray, copper accent), strong typography, generous whitespace, 11 defined sections, sticky nav with Request a Quote CTA, responsive, front-end demo quote form, realistic placeholder brand, real industrial stock photography mixed with AI-generated custom imagery. Art direction target: Awwwards-level — kinetic masked hero reveal, numbered manifesto chapters, editorial marquee, framer-motion scroll reveals, lenis smooth scrolling, parallax hero.

## Architecture
- Frontend-only static React SPA (react-scripts/craco, Tailwind, framer-motion, lenis). Backend (FastAPI/Mongo) present but unused by the site.
- Components in `/app/frontend/src/components/site/`: Navbar, Hero, Marquee, About, Industries, Manufacture, Capabilities, Quality, Gallery, WhyUs, FinalCTA, Footer, QuoteModal, Reveal (shared motion helpers).
- AI-generated images (Gemini Nano Banana via emergentintegrations) in `/app/frontend/public/images/` (hero, about, components, quality, cnc, rail). Stock imagery (Unsplash/Pexels) mapped in `/app/frontend/src/data/images.js`.
- Image regeneration script: `/app/scripts/generate_images.py` (uses EMERGENT_LLM_KEY from backend/.env).
- Design system: `/app/design_guidelines.json` — Oswald display + Manrope body, coal #0F1012, copper #E65C24, steel #78828A, bone #F3F4F0.

## User Personas
- B2B procurement/engineering lead evaluating a component supplier.
- Returning long-term customer checking capabilities.

## Core Requirements (static)
Hero with kinetic headline, trust marquee, About, 4 industry panels, What We Manufacture, Capabilities, Quality, Gallery, Why Choose Us, Final CTA, Footer, demo quote modal, sticky nav, responsive.

## Implemented (2026-08-31)
- All 11 sections + sticky glass navbar + mobile overlay menu
- Kinetic masked line-by-line hero reveal + scroll parallax/zoom on hero image
- Copper editorial marquee trust strip (CSS animation, 48s loop)
- Numbered manifesto chapters 01–07 across sections
- 6 AI-generated custom industrial images (hero macro component, lathe workshop, component flat-lay, micrometer inspection, CNC milling, railway wheel-set)
- Grayscale-to-color hover gallery, bento grids, clipped image frames
- Lenis momentum scrolling with anchor support; framer-motion reveals throughout
- Front-end demo quote modal (name/company/email/phone/industry/requirement + success state; not persisted — by design)
- Page title/meta updated; data-testid on all interactive elements

## Verified
- Full-page screenshot pass (all sections), quote modal submit → success state, zero console errors, all stock image URLs return 200.

## Iteration 2 (2026-08-31) — Real brand identity applied
- Rebranded from placeholder "Precitech" to real company: LUCKY ENGINEERING WORKS (LEW mark in copper square), established 2010, Vasai East, Maharashtra
- Facts sourced from uploaded company profile + product range PDFs: 15+ years (not 30+), CNC turning/milling, Traub automats, conventional lathe/drilling/tapping, 1,500 sq. ft. facility, component capacity up to 40 tons
- Real contact in footer: Gala No. 04, Ganesh Industrial Estate, Near Parmar Talav, Dhaniv, Vasai Phata, Vasai East, Vasai-Virar, Maharashtra 401208; +91 82752 92405 / +91 99224 07816; contact@luckyengineeringwork.com; Google Maps directions link
- Product range lists updated to real catalogue (shafts, bushings & couplings, pins & studs, spacers & sleeves, threaded components, hydraulic fittings, valve & cylinder parts, mounting flanges, bearing housings, custom OEM parts)
- Client trust signals added: third-party manufacturer to L&T, JCB, Dynabac (hero subtext, marquee, About trusted-by strip, Why Us)
- Team (from PDF, not yet on site): Dilip Singh (MD), Aman Singh (Quality & Production), Gaurav Singh (Accounts)

## Backlog
- P0: none blocking
- P1: Real company name/logo/contact details replacement; working quote form (backend persistence + email notification)
- P2: Separate About/Industries detail pages, certifications section, real factory photography swap-in, SEO/schema, light-mode variant

## Next Tasks
1. Swap placeholder brand "Precitech" for real company identity when provided
2. Wire quote form to backend (Mongo enquiry storage) if user wants real leads
3. Add downloadable capability brochure PDF
