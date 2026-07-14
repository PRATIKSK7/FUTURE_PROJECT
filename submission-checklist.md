# Submission Checklist — Task 1: AI Website Copy Generator for Local Businesses

A direct, line-by-line mapping of the original task brief to what's in this repository, so
a reviewer doesn't have to hunt for coverage.

## Objective — "Your goal is to design a prompt framework that can..."

| Brief requirement | Delivered in |
|---|---|
| Generate homepage copy with a strong value proposition | `prompts.md` § 1 (Homepage Copy Prompt) → output in `generated-output.md` § 1 |
| Create service descriptions based on business type | `prompts.md` § 2 (Services Page Prompt) → output in `generated-output.md` § 2 |
| Write persuasive CTA sections | `prompts.md` § 3 (CTA Prompt) → output in `generated-output.md` § 3 |
| Adapt tone and language for different local businesses | `prompts.md` § 4 (Tone-Adaptation Modifier) — used in practice to pivot the whole project from a salon brief to this clinic brief |
| Produce content ready to publish on real websites | `generated-output.md` — structured section-by-section exactly as it would be dropped into a live site |

## "Choose one real local business" — done

**Vitality Diagnostics & Wellness Clinic**, HSR Layout, Bengaluru (diagnostic lab / wellness
clinic). Rationale for this choice is in `README.md` § Business Chosen.

## What You'll Build — Step-by-Step

| Brief requirement | Delivered in |
|---|---|
| Homepage: Headline | `generated-output.md` § 1 — "Accurate Diagnostics, Reports You Can Trust By Evening" |
| Homepage: Sub-headline (who it's for + benefit) | `generated-output.md` § 1 |
| Homepage: Short intro section | `generated-output.md` § 1 |
| Services: Service names | `generated-output.md` § 2 — 4 services |
| Services: What's included | `generated-output.md` § 2 — bullet list per service |
| Services: Why customers should choose this business | `generated-output.md` § 2 — "Why choose us for this" per service |
| CTA: Contact / booking prompts | `generated-output.md` § 3.1 |
| CTA: Trust-building copy | `generated-output.md` § 3.2 |
| CTA: Location-based or urgency-based CTAs | `generated-output.md` § 3.3 |
| Tone adaptation (friendly / professional / confident-simple) | `prompts.md` § 4; **professional** tone used for this business, with the framework capable of producing friendly/confident-simple for other business types |

## Key Features Your System Must Show

| Brief requirement | Delivered |
|---|---|
| ✔ Clear, benefit-driven website copy | Every homepage/services/CTA line ties to a concrete benefit, not a feature list |
| ✔ Business-specific language (not generic AI text) | Specific claims throughout (NABL accreditation, 60+ parameter panel, HSR Layout/Koramangala home collection, same-evening reports) — prompt system explicitly bans generic filler phrases |
| ✔ Strong calls-to-action | 3 distinct CTA types with different psychological drivers, not repeated angles |
| ✔ Adaptable prompts (reusable for multiple clients) | Demonstrated in practice — same prompt chain re-run for two different business types during this project |
| ✔ Content ready for real websites | Copy is fully structured (headline/sub-headline/intro, per-service blocks, CTA blocks) ready to drop into a live build |

## Final Deliverable

| Brief requirement | Delivered |
|---|---|
| Complete AI-generated website copy set (Homepage + Services + CTA) | `generated-output.md` |
| Public GitHub repo containing structured prompts | `prompts.md` |
| ...generated outputs | `generated-output.md` |
| ...README explaining business chosen | `README.md` § Business Chosen |
| ...README explaining prompt logic | `README.md` § Prompt Logic |
| ...README explaining tool used | `README.md` § Tools Used |
