import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { ArticlePage, type ArticleMeta } from "@/components/templates/ArticlePage";

const TITLE = "Utah Small Business Website Checklist: What Google Wants";
const DESCRIPTION =
  "A practical checklist for Utah small business websites covering SEO, speed, mobile, local signals, and conversion elements Google uses to rank sites.";

const META: ArticleMeta = {
  slug: "/blog-utah-website-checklist",
  title: TITLE,
  description: DESCRIPTION,
  h1: "The Utah small business website checklist",
  lede: "Twenty-eight yes-or-no items across technical SEO, on-page, local signals, content, conversion and tracking. No theory — either your site does each one or it doesn't. Score yourself at the end.",
  datePublished: "2026-03-30",
  readingTime: "6 min read",
  category: "Web Design",
  faq: [
    {
      q: "What does Google actually look for on a small business website?",
      a: "That it can crawl the site, that each page is clearly about one thing, that the business has consistent local signals, and that the content genuinely answers what someone searched. Everything on this checklist is a way of making one of those four things true.",
    },
    {
      q: "How fast does a small business website need to load?",
      a: "Under three seconds, ideally under two on mobile. Core Web Vitals — Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift — feed into rankings directly. The usual culprits are uncompressed images, render-blocking scripts and cheap shared hosting.",
    },
    {
      q: "Do I need a separate page for every city I serve?",
      a: "For the cities that matter commercially, yes — with genuinely unique content, not a template with the city name swapped in. Google is good at spotting the swap, and a thin duplicated page can do more harm than not having one at all.",
    },
    {
      q: "Should I put prices on my website?",
      a: "A range is enough and it does real work. 'Websites from $3,000' or 'service calls from $89' filters out inquiries that were never going to convert. You get fewer form submissions and better ones.",
    },
    {
      q: "What score should I be aiming for on this checklist?",
      a: "Above 20 out of 28 is a healthy site. Below 15 usually means the structure itself is the constraint rather than any individual item. Fix local SEO and conversion elements first — they tend to move lead flow faster than technical items on an already-crawlable site.",
    },
  ],
  relatedLinks: [
    { href: "/blog-website-cost-utah", label: "What a website costs in Utah" },
    { href: "/blog-wordpress-vs-custom-code", label: "WordPress vs. custom code" },
    { href: "/blog-get-more-leads-utah-website", label: "How to get more leads from your site" },
    { href: "/web-design-utah", label: "Utah web design service" },
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
        There are hundreds of website best-practice articles out there and most
        of them could apply to any business anywhere. This one is narrower: what
        Google&rsquo;s algorithm and actual Utah customers care about when
        someone is looking for a local service provider.
      </p>
      <p>
        Every item is yes or no. Either your site does it or it doesn&rsquo;t.
        Count as you go.
      </p>

      <h2>Technical foundation (5 items)</h2>
      <p>
        Baseline. Without these, nothing further down matters — Google
        won&rsquo;t rank a site it can&rsquo;t crawl and nobody waits for a page
        that won&rsquo;t load.
      </p>
      <ul>
        <li>
          <strong>Mobile-responsive layout.</strong> Google indexes the mobile
          version first. Test at 375px and 768px, not just on your laptop.
        </li>
        <li>
          <strong>Load time under three seconds.</strong> Under two is the real
          target. Run PageSpeed Insights and fix anything red.
        </li>
        <li>
          <strong>SSL working.</strong> A ranking signal since 2014, and free
          through Let&rsquo;s Encrypt. There&rsquo;s no excuse left.
        </li>
        <li>
          <strong>XML sitemap submitted to Search Console.</strong> Tells Google
          what exists and when it changed, instead of hoping it finds everything.
        </li>
        <li>
          <strong>robots.txt configured correctly.</strong> Check yours. A
          misconfigured one quietly blocks your best pages.
        </li>
      </ul>

      <h2>On-page SEO (6 items)</h2>
      <p>
        This is how you tell Google what each page is about. Individually small.
        Together they decide whether a page matches a query well enough to rank.
      </p>
      <ul>
        <li>
          <strong>A unique title tag on every page.</strong> Under 60 characters,
          target term first. &ldquo;Home&rdquo; is not a title tag.
        </li>
        <li>
          <strong>A meta description on every page.</strong> Under 155
          characters, with a reason to click. Not a ranking factor directly;
          click-through rate is.
        </li>
        <li>
          <strong>One H1 per page containing the target term.</strong> If the
          page is about fence installation in Salt Lake City, the H1 says so.
        </li>
        <li>
          <strong>Correct H2/H3 hierarchy.</strong> Headings are an outline, not a
          font-size control.
        </li>
        <li>
          <strong>JSON-LD schema for LocalBusiness and FAQPage.</strong> Explicit
          machine-readable facts about who you are and what you answer.
        </li>
        <li>
          <strong>Internal links between related pages.</strong> Every important
          page reachable in two clicks from home. Blog posts should link into
          service pages — that&rsquo;s how authority moves.
        </li>
      </ul>

      <h2>Local signals (5 items)</h2>
      <p>
        For Utah service businesses this is where the highest-intent leads come
        from. Someone searching &ldquo;HVAC repair near me&rdquo; is ready to buy
        today.
      </p>
      <ul>
        <li>
          <strong>Google Business Profile claimed, verified and complete.</strong>{" "}
          Categories, hours, service area, photos, description, attributes. Post
          monthly.
        </li>
        <li>
          <strong>NAP consistency.</strong> Same name, address and phone
          everywhere — site, directories, socials. Three variations of your
          business name is three businesses as far as Google is concerned.
        </li>
        <li>
          <strong>City + service keywords on dedicated pages.</strong> Real
          content per city, not a template with the name swapped.
        </li>
        <li>
          <strong>LocalBusiness schema with geo coordinates.</strong> An explicit
          geographic anchor, straight from Google Maps.
        </li>
        <li>
          <strong>An embedded map or location page.</strong> Reinforces
          geographic relevance and helps humans find you.
        </li>
      </ul>

      <h2>Content quality (4 items)</h2>
      <p>
        Google&rsquo;s helpful content systems evaluate whether pages were
        written for people or for algorithms. Thin and duplicated content hurts.
      </p>
      <ul>
        <li>
          <strong>Service pages that address a real problem.</strong> A page
          titled &ldquo;roof replacement&rdquo; should explain why roofs fail in
          Utah&rsquo;s freeze-thaw cycle, what the process involves, and what to
          expect on timeline and cost.
        </li>
        <li>
          <strong>An FAQ with questions customers actually ask.</strong> Pull
          them from sales calls and People Also Ask. Answer in two to four
          sentences.
        </li>
        <li>
          <strong>Supporting posts targeting informational queries.</strong> Each
          linking to a relevant service page. That&rsquo;s how topical authority
          accumulates.
        </li>
        <li>
          <strong>Copy that reads like a person wrote it.</strong> If a paragraph
          would work on a competitor&rsquo;s site with the name swapped, rewrite
          it.
        </li>
      </ul>

      <h2>Conversion elements (5 items)</h2>
      <p>
        Rankings get you traffic. These turn traffic into leads. A site that
        ranks and doesn&rsquo;t convert is an expensive billboard, and it&rsquo;s
        more common than you&rsquo;d think.
      </p>
      <ul>
        <li>
          <strong>Click-to-call visible on mobile without scrolling.</strong> For
          many Utah service businesses, calls convert several times better than
          form fills.
        </li>
        <li>
          <strong>A contact form above the fold on key pages.</strong> Name,
          phone, one line. That&rsquo;s enough.
        </li>
        <li>
          <strong>Specific CTA language.</strong> &ldquo;Get a free
          estimate&rdquo; beats &ldquo;Submit.&rdquo; Match the button to the
          outcome.
        </li>
        <li>
          <strong>Trust signals.</strong> Reviews, star ratings, license numbers,
          certifications. BBB and chamber membership still carry weight here.
        </li>
        <li>
          <strong>A price or starting-at range.</strong> Mine is published:
          websites $3,000–$9,000, software from $25,000. Yours can be a range too.
        </li>
      </ul>

      <h2>Tracking (3 items)</h2>
      <ul>
        <li>
          <strong>GA4 installed and verified</strong> firing on every page, with
          at least one report showing traffic by source and landing page.
        </li>
        <li>
          <strong>Search Console connected with the sitemap submitted.</strong>{" "}
          Watch the coverage report and fix errors within a week.
        </li>
        <li>
          <strong>Conversion events for form submissions and phone taps.</strong>{" "}
          Without these you can&rsquo;t calculate cost per lead or tell which
          pages earn their keep.
        </li>
      </ul>

      <h2>Score yourself</h2>
      <p>Twenty-eight items. Count the ones your site checks off.</p>
      <ul>
        <li>
          <strong>25–28:</strong> strong. Focus on content velocity and
          conversion rate.
        </li>
        <li>
          <strong>20–24:</strong> good foundation, clear gaps. Prioritize local
          SEO and conversion items — they move fastest.
        </li>
        <li>
          <strong>15–19:</strong> underperforming. A focused fix of the weak
          areas could change lead flow without a rebuild.
        </li>
        <li>
          <strong>Below 15:</strong> the structure itself is probably the
          constraint.
        </li>
      </ul>
      <p>
        Worth saying plainly: most of this list you can do yourself, for free,
        this month. The technical items take an afternoon. The profile items take
        a week of consistency. If you&rsquo;re under 20 and the missing items are
        all local signals and conversion elements, hiring anyone to rebuild your
        site would be solving the wrong problem.
      </p>
      <p>
        Where a rebuild earns its cost is the structural half — the pages that
        don&rsquo;t exist yet, the schema, the speed you can&rsquo;t reach on a
        loaded template. That&rsquo;s what{" "}
        <Link href="/web-design-utah">a custom Utah site</Link> is for, and{" "}
        <Link href="/blog-website-cost-utah">what it costs</Link> is published
        rather than quoted.
      </p>
    </ArticlePage>
  );
}
