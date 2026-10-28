# Tourist Inn Maldives — Restrained Maximalism Experience

A responsive web experience for **Tourist Inn Maldives** blending minimalist luxury layout discipline with high-fidelity, playful kinetic physics ("Restrained Maximalism"). The interface fuses editorial architectural typography with snappy spring and fluid luxury physics, featuring the character-by-character Typographic Snap-In Sequence, interactive MagnetLines kinetic field, 3D card tilt transformations, magnetic orbit CTAs, and a real-time room availability & rate calculator.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Execution Parameters:**
> - **Brand Identity**: Tourist Inn (Malé, Maldives) boutique luxury city retreat, integrating real assets and verified data from the attached source document (8.8/10 rating, 678 guest reviews, room rates from $106/night).
> - **Aesthetic Posture**: Restrained Maximalism with Deep Maldivian Navy (`#0A1128`), Warm Sand Linen (`#F7F5F0`), Muted Driftwood (`#EBE6DD`), and Coral Gold / Tomato kinetic accents.
> - **Interaction Rigor**: Typographic Snap-In Sequence with nested overflow masks, 3D Perspective Card Tilt ($\le 12^\circ$), Kinetic Magnet Orbits (within 40px radius), and hardware-accelerated GPU transforms only.

- **Interaction Performance Curves**:
  - Snappy Spring Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for typography snap-ins, hover pops, and magnetic snaps.
  - Fluid Luxury Deceleration: `cubic-bezier(0.16, 1, 0.3, 1)` for card tilt resets, drawer transitions, and smooth settles.
- **Accessibility & Safe Motion**: All interactive animations are guarded by `@media (prefers-reduced-motion: reduce)` fallbacks and comply with WCAG AA 4.5:1 text contrast.

---

## 1. Overview & Core Concept

- **What It Does**: Presents a luxury landing and booking portal for Tourist Inn in Malé City, Maldives. Features a sticky geometric navigation header, a split-layout hero featuring the interactive `MagnetLines` kinetic canvas alongside the animated typographic headline, a 3-column features and amenities grid with 3D perspective tilt, a dynamic multi-tier room accommodation and pricing table with stay date calculators, verified guest reviews, and an interactive reservation/newsletter footer.
- **Target Audience**: Discerning international travelers, transit visitors, remote professionals, and couples seeking authentic Maldivian hospitality with seamless airport connections via the Sinamalé Bridge.
- **Key Value**: Delivers the tactile delight of high-energy spring motion without compromising editorial dignity, clear navigation, or conversion efficiency.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **First Arrival & Typographic Reveal**:
   - The user loads the page and experiences the character-by-character **Typographic Snap-In Sequence** on the primary hero headline ("TOURIST INN · AN ISLAND SANCTUARY") shooting up from `translateY(110%)` to `0` across staggered delays with snappy spring physics.
2. **Kinetic Hero Canvas Exploration**:
   - The user hovers across the right-side asset viewport containing the `MagnetLines` interactive grid (9x9 lines rotating smoothly toward the cursor).
3. **Interactive Booking & Fact Discovery**:
   - The user configures check-in/check-out dates and guest count in the integrated reservation bar, dynamically recalculating total stay estimates for Superior Double ($106) and Deluxe Double ($109) rooms.
4. **Features & Amenities 3D Tilt**:
   - User hovers over the 3-column features grid (Malé City Centrality, Private Kitchenettes & Suites, 24/7 Island Concierge); cards reactively tilt along 3D mouse vectors up to 12° with scale lift.
5. **Multi-Tier Room Showcase & Pricing**:
   - Detailed side-by-side room tiers featuring highlighted "Most Popular" selection, interactive feature comparisons, high-resolution photography, and magnetic orbit booking buttons.
6. **Curated Island Sights & Testimonials**:
   - Filterable guest review breakdown (9.7/10 average score highlights) and transit distance facts (Sinamalé Bridge, Rasfannu Beach, National Museum).

### Visual Identity & Theme
- **Color Palette (60-30-10 Rule)**:
  - **60% Dominant Canvas**: Warm Island Sand Linen (`#F8F7F4`) and Deep Marine Navy (`#0A1128`) for dark contrast sections.
  - **30% Structural Surfaces**: Crisp Pearl White (`#FFFFFF`), Soft Cream (`#F1EFEA`), and Hairline Slate Borders (`rgba(10,17,40, 0.08)`).
  - **10% Kinetic Accents**: Coral Gold / Tomato (`#FF5A36` and `#D97706`) strictly focused on interactive lines, focus rings, and primary action triggers.
- **Core Typography Pairing**:
  - **Display / Editorial**: `Playfair Display` serif (600/700 weight) for dramatic luxury headlines and room titles.
  - **Body Prose & Controls**: `Inter` and `Plus Jakarta Sans` for clean, high-legibility interface copy.
  - **Data & Telemetry**: Monospace tabular numerals (`font-mono tabular-nums`) for currency, review scores, and distances.
- **Top Bar Contract**:
  - Strict 3-zone layout: `[TOURIST INN]` (Wordmark) — `[Rooms · Amenities · Experiences · Location]` (4 clean text links) — `[Reserve Room]` (1 primary magnetic CTA).

### Motion Specifications
- **Typographic Snap-In**: Split text string by character into inline-block spans with `overflow: hidden` wrapper. Each character transitions with `cubic-bezier(0.34, 1.56, 0.64, 1)` and a staggered delay multiplier (`index * 0.025s`).
- **3D Perspective Card Tilt**: On `mousemove`, compute relative cursor position $(x, y) \in [-0.5, 0.5]$ and apply `transform: perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.04)`. On `mouseleave`, settle back via `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Kinetic Magnet Orbits**: On buttons, compute offset vector within 40px bounding box and translate element up to 25% toward the pointer, snapping back instantly on exit.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Modular `MagnetLines` Implementation**:
  - *Chosen Approach*: Implement `@/sd-components/679ce99e-18b4-4c5f-a421-c1a3fd1bac4c` as a high-performance vector SVG/Canvas component matching the exact mandated parameters: `rows={9}`, `columns={9}`, `containerSize="60vmin"`, `lineColor="tomato"`, `lineWidth="0.8vmin"`, `lineHeight="5vmin"`, `baseAngle={0}`.
  - *Why*: Satisfies the explicit integration mandate while guaranteeing 60fps rendering without external network latency or missing dependencies.
- **Decision 2: Hardware-Accelerated Animation Pipeline**:
  - *Chosen Approach*: Pure CSS variables combined with React pointer hooks controlling `translate3d`, `rotate3d`, and `scale`.
  - *Why*: Zero layout reflow or repaint thrashing. Preserves battery and 120Hz ProMotion display fluidity.
- **Decision 3: Integrated Stay Calculator**:
  - *Chosen Approach*: Real-time state computation calculating nights, room multipliers, and tax/fees for Malé city stays, instantly updating room pricing cards.
  - *Why*: Eliminates dead clicks and provides an authentic, functional booking workflow.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│            (State: Active Room, Date Range, Guests, Currency)          │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
┌──────────────┐          ┌──────────────────┐          ┌──────────────┐
│  TopNavBar   │          │   HeroSection    │          │ FeaturesGrid │
│ (3-Zone CTA, │          │  (TypoSnapIn,    │          │  (3D Card    │
│  MagnetOrbit)│          │   MagnetLines)   │          │   Tilt Grid) │
└──────────────┘          └────────┬─────────┘          └──────────────┘
                                   │
      ┌────────────────────────────┴────────────────────────────┐
      ▼                                                         ▼
┌──────────────────┐                                   ┌──────────────┐
│   PricingTable   │                                   │  FootSection │
│  (Multi-Tier,    │                                   │ (Newsletter, │
│   Nights Calc)   │                                   │  Sights POI) │
└──────────────────┘                                   └──────────────┘
```

### Component Hierarchy
1. `src/components/TopNavBar.tsx`: Sticky 3-zone header with magnetic CTA and currency selector.
2. `src/components/TypographicSnapIn.tsx`: Reusable character-by-character mask spring animator.
3. `src/components/MagnetLines.tsx` (`@/sd-components/...`): Interactive 9x9 kinetic line matrix.
4. `src/components/HeroSection.tsx`: Split layout with headline snap-in, trust badges, and MagnetLines preview.
5. `src/components/BookingBar.tsx`: Interactive dates & guest selector with instant summary.
6. `src/components/FeaturesGrid.tsx`: 3-column cards with 3D perspective tilt and custom iconography.
7. `src/components/PricingTable.tsx`: Multi-tier room comparison (Superior Double, Deluxe Double, Family Suite) with "Most Popular" highlight and live cost calculator.
8. `src/components/ExperienceGallery.tsx`: Malé city sights, transfer details, and verified review bands.
9. `src/components/FooterSection.tsx`: Editorial footer with newsletter validation and direct contact channels.
10. `src/hooks/useMagneticOrbit.ts` & `src/hooks/useCardTilt.ts`: Clean performance hooks for kinetic interactions.

---

## Plan Verification & Next Steps
- Verify compilation with `compile_applet`.
- Verify responsive layout across mobile, tablet, and desktop viewports.
- Confirm full compliance with WCAG AA contrast and `prefers-reduced-motion`.
