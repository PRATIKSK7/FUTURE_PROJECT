# Task 1 — AI Website Copy Generator for Local Businesses

**Future Interns — Prompt Engineering Internship**

## Business Chosen

**Vitality Diagnostics & Wellness Clinic**, HSR Layout, Bengaluru — a diagnostic lab and
wellness clinic offering full-body health checkups, individual diagnostic tests, imaging,
and doctor consultations.

A diagnostic clinic was chosen deliberately over a lower-stakes business type (like a
salon or cafe). Healthcare copy has to work harder: it needs to build genuine trust,
explain a service most visitors don't fully understand, and drive a higher-commitment
action (booking a health checkup) rather than an impulse visit. It's a stronger test of
the prompt system, and a more serious, portfolio-credible use case.

## Problem This Solves

Diagnostic clinics like this lose customers not because the testing is bad, but because:
- The website copy doesn't explain *why this lab* over the dozens of others nearby
- The value proposition is generic ("trusted healthcare partner") with nothing concrete backing it
- Calls-to-action are weak, and first-time patients hesitate without a visible trust signal
- Hiring a professional healthcare copywriter is expensive, and clinics often reuse
  template text bundled with their lab equipment/software vendor

This project solves that with a **structured, reusable prompt system** — rather than
one-off AI-generated text — that produces publish-ready homepage, services, and CTA copy.

## Tools Used

| Tool | Purpose |
|---|---|
| Claude (claude.ai) | Prompt system design and structured copy generation |
| Google Docs / Markdown | Structuring and formatting the final copy |
| GitHub | Hosting the prompt system and generated outputs publicly |

## Repository Structure

```
├── README.md                 → this file
├── prompts.md                → the full reusable prompt framework (Prompts 0–4)
├── generated-output.md       → final generated website copy (homepage, services, CTAs)
└── submission-checklist.md   → line-by-line mapping of task requirements to what's delivered
```

## Prompt Logic (Summary)

The system is built as a **chain of prompts**, not a single mega-prompt — each stage has a
narrow job so the output stays controllable and reviewable, the way a real agency workflow
would work:

1. **Master Context Prompt** — locks in the business brief (name, type, location, target
   customer, differentiator, tone, goal) so every later prompt stays factually consistent.
2. **Homepage Prompt** — generates headline, sub-headline, and intro using a fixed
   value-proposition structure.
3. **Services Prompt** — generates per-service breakdowns (what's included + why choose
   us), forcing specificity over generic adjectives.
4. **CTA Prompt** — generates three CTA blocks, each using a different psychological
   driver (low-friction booking, trust, honest urgency) instead of repeating the same angle.
5. **Tone-Adaptation Prompt** — lets the exact same system be re-run for a different
   business type by swapping only the tone and business variables. This is what makes the
   system *reusable* rather than a one-off script — it was used in practice to pivot this
   project from an initial salon example to the final clinic business without rewriting
   the framework itself.

Full prompt text is in [`prompts.md`](./prompts.md). Full generated output is in
[`generated-output.md`](./generated-output.md).

## Key Features (mapped to task requirements)

| Requirement | Status | Where |
|---|---|---|
| Homepage copy — headline, sub-headline, intro | ✅ | `generated-output.md` § 1 |
| Services page — names, what's included, why choose us | ✅ | `generated-output.md` § 2 |
| CTA sections — booking, trust, urgency/location | ✅ | `generated-output.md` § 3 |
| Tone adaptation (friendly / professional / confident-simple) | ✅ | `prompts.md` § 4; professional tone used for this clinic |
| Business-specific, non-generic language | ✅ | Specific claims throughout (NABL accreditation, 60+ parameter panel, HSR Layout/Koramangala home collection, same-evening reports) |
| Adaptable/reusable prompts | ✅ | Same 4-prompt system re-run from a salon brief to this clinic brief with only variables changed |
| Content ready for a real website | ✅ | Copy is structured section-by-section exactly as it would be dropped into a live site build |
| Public GitHub repo w/ prompts + outputs + README | ✅ | This repository |

## Skills Demonstrated

- Prompt engineering for structured, multi-part, chained content generation
- Website copywriting with conversion focus (headline/value-prop structure, CTA
  psychology, trust-building language)
- Client requirement translation (business brief → usable web copy)
- Reusable AI content-workflow design (tone-adaptation for multi-client reuse)

## Next Step (Learn & Earn)

The plan is to share this generated copy with a real HSR Layout / Koramangala-area
diagnostic clinic, walk them through how it improves clarity, trust, and conversion versus
their current site copy, and offer to set it up on their live site — potentially
converting this into a first paid client engagement.

---
*Built for the Future Interns Prompt Engineering Internship — Task 1.*
