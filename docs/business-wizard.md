# Business Profile Wizard

The Business Wizard is the entry point for generating contextual copy. It ensures that the AI understands the core identity and goals of the brand before writing a single word.

## Workflow
1. **Basic Details:** Brand name, industry, and website.
2. **Value Proposition:** What makes the brand unique and what exact products/services they offer.
3. **Target Audience:** Demographics, pain points, and desires.
4. **Brand Voice:** Tone (e.g., professional, playful, urgent) and stylistic guidelines.
5. **Review:** A summary page validating all inputs before saving to the database.

## Technical Implementation
- Implemented as a multi-step form utilizing React Hook Form and Zod for strict client-side validation.
- Progress is tracked via Zustand state management, allowing users to navigate back and forth without losing data.
- Employs auto-save functionality to prevent data loss.
