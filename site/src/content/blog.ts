/**
 * The blog index. Slugs are carried over verbatim from the pre-2026 site —
 * they keep the flat `blog-` prefix rather than moving to `/blog/<slug>`,
 * because re-slugging would stack a second URL migration on the first.
 *
 * `datePublished` is the real date each post first went live. Do not touch it
 * to make the index look fresher; posts that were genuinely rewritten carry a
 * `dateModified` on the post page itself.
 */

export type Post = {
  /** Absolute route, e.g. "/blog-website-cost-utah". */
  slug: string;
  title: string;
  excerpt: string;
  datePublished: string;
  category: string;
  readingTime: string;
};

export const POSTS: Post[] = [
  {
    slug: "/blog-bookkeeping-firm-hidden-costs",
    title: "The hidden cost of running a bookkeeping firm on QuickBooks, spreadsheets and email",
    excerpt:
      "QuickBooks handles the books. It does not manage the firm. Here is where the coordination cost hides — and what it adds up to in a normal month.",
    datePublished: "2026-05-05",
    category: "Bookkeeping Operations",
    readingTime: "6 min read",
  },
  {
    slug: "/blog-field-service-software-cost",
    title: "How much does field service software cost?",
    excerpt:
      "The sticker price is the easy part. Here is the five-year math on subscriptions, setup fees and the drag nobody quotes you — and when owning is cheaper.",
    datePublished: "2026-07-07",
    category: "Field Operations",
    readingTime: "6 min read",
  },
  {
    slug: "/blog-jobber-vs-custom-software",
    title: "Jobber vs. custom software for field service teams",
    excerpt:
      "Jobber is good software for the right stage. Here is where growing teams outgrow it, and the honest signals that ownership beats another subscription.",
    datePublished: "2026-07-11",
    category: "Field Operations",
    readingTime: "5 min read",
  },
  {
    slug: "/blog-servicetitan-vs-custom-software",
    title: "ServiceTitan vs. custom software — what nobody tells you",
    excerpt:
      "The subscription fits on paper while your team quietly absorbs the drag. This is the comparison the sales process skips.",
    datePublished: "2026-03-20",
    category: "Operations Software",
    readingTime: "5 min read",
  },
  {
    slug: "/blog-field-service-software-vs-off-the-shelf",
    title: "When off-the-shelf field service software starts breaking down",
    excerpt:
      "Three warning signs that your operation has outgrown a generic platform — and what actually changes once the software fits the work.",
    datePublished: "2026-03-12",
    category: "Field Operations",
    readingTime: "4 min read",
  },
  {
    slug: "/blog-how-to-know-youve-outgrown-spreadsheets",
    title: "How to know when your business has outgrown spreadsheets",
    excerpt:
      "If reporting takes hours, status lives in four places and one person holds the formulas, the spreadsheet stopped being a tool a while ago.",
    datePublished: "2026-03-08",
    category: "Operations Software",
    readingTime: "4 min read",
  },
  {
    slug: "/blog-why-service-business-websites-dont-convert",
    title: "Why most service business websites don't generate leads",
    excerpt:
      "The problem is rarely the design. It is positioning, search intent, a fuzzy next step, and no proof anywhere on the page.",
    datePublished: "2026-03-04",
    category: "Web Design",
    readingTime: "4 min read",
  },
  {
    slug: "/blog-website-cost-utah",
    title: "How much does a website cost in Utah in 2026?",
    excerpt:
      "Every tier from DIY builders to agency retainers, what actually moves the number, the costs nobody quotes, and how to think about return instead of expense.",
    datePublished: "2026-03-25",
    category: "Web Design",
    readingTime: "7 min read",
  },
  {
    slug: "/blog-wordpress-vs-custom-code",
    title: "WordPress vs. custom code for a Utah business",
    excerpt:
      "WordPress runs a huge share of the web. Here is when it is genuinely the right call, and when it is overhead you quietly pay for every month.",
    datePublished: "2026-03-16",
    category: "Web Design",
    readingTime: "6 min read",
  },
  {
    slug: "/blog-hvac-website-design-utah",
    title: "HVAC website design: what actually gets leads in Utah",
    excerpt:
      "Dedicated service pages, an emergency-ready layout, seasonal content, and a Google Business Profile that pulls its weight along the Wasatch Front.",
    datePublished: "2026-04-03",
    category: "Web Design",
    readingTime: "6 min read",
  },
  {
    slug: "/blog-get-more-leads-utah-website",
    title: "How to get more leads from your Utah business website",
    excerpt:
      "Eight concrete steps in the order I would do them — audit, profile, intent pages, CTAs, proof, speed, supporting content, tracking.",
    datePublished: "2026-04-08",
    category: "Web Design",
    readingTime: "6 min read",
  },
  {
    slug: "/blog-utah-website-checklist",
    title: "The Utah small business website checklist",
    excerpt:
      "Twenty-eight yes-or-no items across technical SEO, on-page, local signals, content, conversion and tracking. Score your own site in ten minutes.",
    datePublished: "2026-03-30",
    category: "Web Design",
    readingTime: "6 min read",
  },
];

/** Operations, field service and bookkeeping — the software track. */
export const OPS_POSTS = POSTS.filter((post) => post.category !== "Web Design");

/** Websites, local SEO and lead generation — the web track. */
export const WEB_POSTS = POSTS.filter((post) => post.category === "Web Design");
