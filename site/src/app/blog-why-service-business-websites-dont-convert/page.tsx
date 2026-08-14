import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { ArticlePage, type ArticleMeta } from "@/components/templates/ArticlePage";

const TITLE = "Why Most Service Business Websites Don't Generate Leads";
const DESCRIPTION =
  "Most service business websites fail because they're built like brochures instead of sales systems. Here is what actually changes lead flow.";

const META: ArticleMeta = {
  slug: "/blog-why-service-business-websites-dont-convert",
  title: TITLE,
  description: DESCRIPTION,
  h1: "Why most service business websites don't generate leads",
  lede: "Plenty of sites look fine and still produce nothing. The problem usually isn't aesthetics. It's that the page was never built to answer buyer intent or remove friction — it was built to exist.",
  datePublished: "2026-03-04",
  readingTime: "4 min read",
  category: "Web Design",
  faq: [
    {
      q: "Why doesn't my website generate leads even though it looks good?",
      a: "Looking good and converting are different jobs. A page converts when it says who it's for, matches the search that brought someone there, makes the next step obvious, and shows proof. Most brochure sites do none of those, and design polish can't compensate.",
    },
    {
      q: "Do I need separate pages for each service and city?",
      a: "If you want to rank for those searches, yes. One homepage cannot rank for every service and location combination that matters — Google needs a page that's specifically about the thing someone typed. That's the single biggest structural change most service sites can make.",
    },
    {
      q: "What's the best call to action for a service business website?",
      a: "Something specific and low-commitment. 'Get a free estimate' or 'Book a 30-minute call' beats 'Contact us' because the visitor knows exactly what happens next. Pair it with a tappable phone number in the header on every page.",
    },
    {
      q: "Is a redesign the answer?",
      a: "Often not. If the site is structurally sound and the gap is your Google Business Profile, your review count or a buried phone number, fixing those is far cheaper than a rebuild. A redesign is the right call when the structure itself can't carry the searches you need to win.",
    },
  ],
  relatedLinks: [
    { href: "/blog-get-more-leads-utah-website", label: "How to get more leads from your site" },
    { href: "/blog-utah-website-checklist", label: "The Utah website checklist" },
    { href: "/blog-website-cost-utah", label: "What a website costs in Utah" },
  ],
  moneyPage: { href: "/web-design-utah", label: "SEE UTAH WEB DESIGN" },
};

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: META.slug,
  article: {
    publishedTime: META.datePublished,
    modifiedTime: META.dateModified,
  },
});

export default function Page() {
  return (
    <ArticlePage meta={META}>
      <p>
        Most service business sites get treated like digital brochures. They
        explain what the business does, list some services, add a contact form,
        and stop. That creates presence. It rarely creates demand.
      </p>
      <p>
        If the goal is leads, the site has to do more than exist. It has to help
        the right prospect understand three things fast: what problem you solve,
        why you&rsquo;re a better fit than the next result, and what to do now.
      </p>

      <h2>Problem one: the positioning is interchangeable</h2>
      <p>
        &ldquo;We offer quality service.&rdquo; &ldquo;Customer satisfaction is
        our priority.&rdquo; Those sentences could belong to any of the two
        hundred companies in your trade along the Wasatch Front, which means they
        differentiate nothing.
      </p>
      <p>
        Stronger sites lead with an angle: the kind of business they&rsquo;re
        best for, the specific problems they solve, the result they produce. If a
        paragraph on your site would still read correctly with a competitor&rsquo;s
        name swapped in, it&rsquo;s doing no work.
      </p>

      <h2>Problem two: nothing matches search intent</h2>
      <p>
        One homepage can&rsquo;t rank for every service, industry and location
        combination that matters to you. Google needs a page that&rsquo;s
        specifically about the thing someone typed, and visitors need to land
        somewhere that answers it.
      </p>
      <p>
        This is why multi-page structure matters more than any design decision on
        the site. A homepage introduces the company; a dedicated page can target{" "}
        <Link href="/web-design-utah">custom website design in Utah</Link> — or
        AC repair in Sandy, or roof replacement in Ogden — with far more clarity.
        It&rsquo;s the core of{" "}
        <Link href="/blog-get-more-leads-utah-website">
          getting more leads from a website you already own
        </Link>
        .
      </p>

      <h2>Problem three: the next step is fuzzy</h2>
      <p>
        When the only call to action is &ldquo;contact us,&rdquo; visitors have to
        do the thinking. What happens after I send this? How long until someone
        replies? Am I agreeing to a sales call?
      </p>
      <p>
        Stronger sites give a next step that&rsquo;s specific and low-friction:
        book a discovery call, request an audit, get a scope. And they put a
        tappable phone number in the header of every page, because a meaningful
        share of service business leads never fill in a form at all.
      </p>

      <h2>Problem four: the page asks for trust before it earns it</h2>
      <p>
        Prospects want evidence. Named reviews, real project photos, a license
        number, a ranking, a result you can point at. Without those, the page is
        asking someone to hand over their phone number on the strength of a stock
        photo.
      </p>
      <p>
        This is also the part you can fix without touching the code. Ten named
        reviews with cities attached will do more for conversion this month than
        a new color palette. My own version of this is a 5.0 Clutch rating and
        a #3 spot on The Manifest for Utah — specific, checkable, and worth more
        than any adjective I could write about myself.
      </p>

      <h2>What a lead-generating site actually does</h2>
      <p>
        It speaks to one buyer, matches intent with dedicated pages, makes the
        next step obvious, and builds confidence with proof. Design still matters
        — a site that looks amateur loses trust in the first second — but design
        isn&rsquo;t the system. Positioning, structure and conversion clarity are
        the system.
      </p>
      <p>
        And the honest caveat: if your structure is already sound, don&rsquo;t buy
        a redesign. Fix the profile, get the reviews, unbury the phone number, and
        spend the money on trucks. A rebuild is only worth it when the structure
        itself can&rsquo;t carry the searches you need to win.
      </p>
    </ArticlePage>
  );
}
