export type FaqItem = { q: string; a: string };

/**
 * These render the visible accordion AND the FAQPage schema from the same
 * objects, so the two can never drift on pricing.
 */
export const HOME_FAQ: FaqItem[] = [
  {
    q: "How much does a project cost?",
    a: "Custom websites run $3,000–$9,000. Operations software and mobile apps start at $25,000, and most V1 builds land between $25,000 and $65,000. Scope, timeline, and cost are defined before any code is written — no surprise invoices.",
  },
  {
    q: "How long does it take to build?",
    a: "Websites ship in 1–4 weeks. A scoped V1 of custom software takes 6–12 weeks depending on complexity. The timeline holds because the scope is settled before we start.",
  },
  {
    q: "Do I own the code when it's done?",
    a: "Yes, fully — yours on final payment. No vendor lock-in and no subscription required to keep using it. We build on proven internal frameworks to move faster, but everything built for your business belongs to you.",
  },
  {
    q: "What happens after launch?",
    a: "Every project ships with a bug warranty: 90 days for websites, up to 150 days for custom software. After that most clients move to a managed retainer — dedicated hosting, monitoring, feature work at a reduced rate, and direct access to the person who wrote the code. Optional, never required.",
  },
  {
    q: "I just have an idea, not a spec. Is that okay?",
    a: "That's how most of the best projects start. Discovery exists exactly for this — we turn the rough conversation into a defined V1 with a number attached before anything gets built.",
  },
  {
    q: "Will you tell me if I don't need custom software?",
    a: "Yes, and it happens. If an off-the-shelf tool genuinely solves your problem, I'll name it and tell you to go buy it. Morals over money isn't a slogan — it's why the referrals keep coming.",
  },
];
