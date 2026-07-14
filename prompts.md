# Prompt System — AI Website Copy Generator for Local Businesses

This file contains the full, reusable prompt framework used to generate the website copy in `generated-output.md`. Every prompt below is built to be **business-agnostic** — swap the bracketed variables and the same system works for a salon, cafe, clinic, coaching institute, or agency.

---

## 0. Master Context Prompt (run first, in every new chat)

This "primes" the model with the client's identity so every following prompt stays consistent in voice and facts.

```
You are a senior website copywriter and conversion strategist working for a digital agency.
You are writing real, publish-ready website copy for a paying local business client — not
sample text, not a demo. Every line must be usable as-is on a live website.

CLIENT BRIEF
- Business name: {business_name}
- Business type: {business_type}  (e.g. salon, cafe, clinic, coaching institute, agency)
- Location: {city_area}
- Target customer: {target_customer}
- Core services / offerings: {service_list}
- What makes this business different: {differentiator}
- Tone required: {tone}  (choose: friendly / professional / confident-simple)
- Primary customer action we want (goal): {primary_cta_goal}  (e.g. book appointment, call now, visit store, enquire)

RULES YOU MUST FOLLOW
1. Never write generic AI filler ("we are passionate about excellence," "your one-stop solution," etc.)
2. Every sentence must earn its place — either builds trust, states a benefit, or drives action.
3. Write like a human strategist who has actually visited this business, not a template engine.
4. Keep sentences short enough to read on a phone screen.
5. Do not invent fake awards, certifications, or statistics.
6. Match the {tone} exactly — do not default to corporate/professional if friendly was requested.

Confirm you understand this brief before I give you the next instruction. Summarize the
client back to me in 3 lines.
```

**Why this exists:** it forces tone, business specifics, and constraints to persist across the whole chat, so Prompts 1–3 don't need to repeat the entire brief each time.

---

## 1. Homepage Copy Prompt

```
Using the client brief above, write the homepage copy for {business_name}.

Produce exactly these three sections:

1. HEADLINE (max 10 words)
   - Must state the core value proposition, not just the business category.
   - Should pass the "so what" test — a stranger should instantly know what they get.

2. SUB-HEADLINE (1 sentence, max 25 words)
   - States WHO this is for + the specific benefit they get.
   - Format pattern: "For [target customer] who want [benefit], without [common pain point]."

3. INTRO SECTION (60–90 words)
   - Opens by naming the customer's problem or desire.
   - Positions {business_name} as the solution using the differentiator from the brief.
   - Ends with a soft transition line that leads into the services section (e.g. "Here's how we help.")

Constraints:
- No em-dash-heavy "AI voice." Vary sentence length.
- Do not repeat the business name more than twice total.
- Write in {tone}.

Output in clean markdown with the three sections clearly labeled.
```

---

## 2. Services Page Prompt

```
Using the same client brief, write the Services Page content for {business_name}.

For EACH service in {service_list}, produce:

- Service Name (customer-facing, not internal jargon)
- What's Included (2–4 bullet points, concrete and specific — avoid "high quality," "premium
  experience" unless backed by a specific detail)
- Why Choose Us For This (1–2 sentences tying back to the differentiator, written as a reason
  to book THIS business over a competitor, not just a description of the service)

Formatting rules:
- One clearly separated block per service.
- Bullets must describe outcomes or specifics ("includes scalp massage + steam towel finish"),
  not vague adjectives.
- Keep total length per service under 80 words so it's scannable on mobile.

Write in {tone}. Output in clean markdown.
```

---

## 3. CTA (Call-to-Action) Section Prompt

```
Using the same client brief, write three distinct CTA blocks for {business_name}'s website.
Each must have a different psychological driver — do not repeat the same angle three times.

1. CONTACT / BOOKING CTA
   - Direct, low-friction, action-first line + button-style CTA text (max 5 words for the button).
   - Should reduce hesitation (make the next step feel small and easy).

2. TRUST-BUILDING CTA
   - Reassures a first-time or hesitant customer.
   - Reference something concrete from the brief (experience, specialization, guarantee,
     personal attention) — never a vague trust claim with no backing detail.

3. URGENCY / LOCATION-BASED CTA
   - Uses one honest urgency lever: limited slots, seasonal offer, "serving {city_area} since
     X," or proximity ("5 minutes from [landmark]").
   - Must NOT use fake scarcity ("only 2 spots left!!") — keep it credible for a real client.

For each block, provide:
- The CTA headline (1 short line)
- The supporting line (1 sentence)
- The button/action text (2–5 words)

Write in {tone}. Output in clean markdown.
```

---

## 4. Tone-Adaptation Modifier (use when reusing this system for a new client)

This prompt is what makes the whole system **reusable across multiple clients** — the core task requirement.

```
Rewrite the copy above for a new client with these changes only:

- New tone: {new_tone}  (friendly = warm, casual, exclamation-light, conversational;
  professional = precise, credibility-first, minimal contractions;
  confident-simple = short punchy sentences, no jargon, direct promises)
- New business type: {new_business_type}
- Keep the same structural format (headline / sub-headline / intro, same service block
  structure, same 3 CTA types).
- Do not carry over any specific claims, numbers, or details from the previous client —
  every fact must come from the new brief only.
```

**Example tone pairing used for this task:**
| Business type | Tone |
|---|---|
| Salon / Cafe | Friendly |
| Clinic / Agency | Professional |
| Coaching institute | Confident but simple |

---

## Why this prompt system works (prompt logic notes for the README)

- **Single source-of-truth brief (Prompt 0)** prevents the classic failure mode of AI copy —
  inconsistent facts or tone drifting across sections.
- **Separation of concerns** (homepage / services / CTA as separate prompts) keeps each output
  focused and lets a real client review/approve one section at a time, the way an agency would.
- **Explicit anti-generic-AI-text rules** are repeated in every prompt because tone drift back
  to "corporate filler" is the single most common failure when generating marketing copy with LLMs.
- **The tone-adaptation prompt** is what turns this from "one-off content" into a system —
  the same 4 prompts can generate copy for any local business by swapping variables only.
