# ForgeFit — Premium Gym & Fitness Club Website

**Live Demo → [forgefitx.vercel.app](https://forgefitx.vercel.app/)**

A complete, conversion-focused website built for modern gyms, fitness clubs, and personal training studios. Everything is ready to launch — just add your brand, content, and go live.

---

## What's Included

### Pages & Sections

- **Hero** — Full-screen banner with headline, subheadline, and two call-to-action buttons
- **Program Strip** — Highlight your core offerings (Strength, Conditioning, PT, Recovery, Nutrition)
- **BMI Calculator** — Interactive tool that warms up visitors and connects them to your consultation form
- **Experience** — Split-layout section with text and a three-image grid to showcase your facility
- **Member Journey** — Three-card outcome section explaining your onboarding process
- **Class Schedule** — Filterable live schedule with category tabs (Strength, Cardio, Recovery, Combat)
- **Facility Highlights** — Full-width banner listing your equipment and amenities
- **Membership Plans** — Three-tier pricing cards (Starter, Performance, Elite Coaching) with a highlighted "Popular" plan
- **Coaches** — Photo cards for each trainer with role and credentials
- **Member Testimonials** — Three star-rated review cards with name and result
- **FAQ** — Accordion-style frequently asked questions section
- **Consultation Booking Form** — Lead capture form with name, email, phone, goal, and plan selection
- **Final CTA Banner** — High-contrast closing call-to-action with trial offer
- **Footer** — Business name, address, and copyright

### Features

- Fully responsive — works on mobile, tablet, and desktop
- Sticky navigation header with mobile slide-out menu
- Smooth scroll navigation between sections
- Class schedule filters by category
- Pricing plan selection syncs with the booking form
- Consultation form saves leads to your database
- Works without a database configured (shows a friendly message, no crash)
- Fast load — images lazy-loaded, fonts optimized
- SEO-ready metadata (title, description)
- Keyboard accessible — mobile menu has a full focus trap
- Clean, modern design with a dark/premium aesthetic

---

## What You Can Customize

Every section is built as a standalone, editable block:

| What | Where |
|---|---|
| Plans, prices, perks | `lib/data.ts` — `PLANS` array |
| Class schedule | `lib/data.ts` — `CLASSES` array |
| Trainer names, roles, photos | `lib/data.ts` — `TRAINERS` array |
| Testimonials | `lib/data.ts` — `TESTIMONIALS` array |
| FAQs | `lib/data.ts` — `FAQS` array |
| Facility list | `lib/data.ts` — `FACILITIES` array |
| Business name, address, phone, email | `app/components/BookingForm.tsx` + `SiteFooter.tsx` |
| Hero image | `lib/data.ts` — `HERO_IMAGE` |
| Studio/facility images | `lib/data.ts` — `STUDIO_IMAGES` |
| Page title and SEO description | `app/layout.tsx` |
| Brand colors | `app/globals.css` — CSS variables at the top |

All content lives in one file (`lib/data.ts`). No digging through components to update your gym's details.

---

## Lead Management

When a visitor submits the consultation form:

- Their details (name, email, phone, goal, plan interest) are saved to your database
- You can retrieve all submissions via a private admin API endpoint
- The form handles errors gracefully — if the database is temporarily unavailable, the visitor still sees a confirmation and you can follow up manually

---

## Setup (for the buyer's developer)

Full step-by-step instructions are in the technical documentation included with the project. Setup takes under 15 minutes for a developer familiar with web hosting.

The site is ready to deploy to any modern hosting platform. No special infrastructure required.

---

## Design

- Dark, premium aesthetic with a warm neutral background
- High-contrast hero with overlay gradient
- Bold display typography for headings
- Accent red color scheme (fully customizable in one place)
- Consistent 8px border-radius design system throughout
- Smooth hover states on all interactive elements

---

## What This Is Not

- Not a page builder or template editor — this is production source code
- Not a SaaS subscription — you own it outright after purchase
- Not locked to any platform — host it wherever you want

---

## Ideal For

- Gyms and fitness clubs launching or refreshing their online presence
- Personal trainers who want a professional lead-capture site
- CrossFit boxes, boutique studios, and conditioning facilities
- Agencies building gym websites for clients

---

## License

Single-use commercial license. You may use and modify this project for one business or client. You may not resell or redistribute the source code.

---

*For questions before purchase, feel free to reach out.*