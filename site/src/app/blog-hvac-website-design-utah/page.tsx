import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { ArticlePage, type ArticleMeta } from "@/components/templates/ArticlePage";

const TITLE = "HVAC Website Design: What Actually Gets Leads in Utah | MDS";
const DESCRIPTION =
  "What HVAC companies in Utah need on their website to rank on Google and convert visitors into service calls, from a Utah web designer.";

const META: ArticleMeta = {
  slug: "/blog-hvac-website-design-utah",
  title: TITLE,
  description: DESCRIPTION,
  h1: "HVAC website design: what actually gets leads in Utah",
  lede: "HVAC is one of the most competitive local search categories along the Wasatch Front. Your site is up against franchise marketing teams, aggregator listings and map results with four hundred reviews. Here's what actually moves the needle.",
  datePublished: "2026-04-03",
  readingTime: "6 min read",
  category: "Web Design",
  faq: [
    {
      q: "What should an HVAC website include to generate leads in Utah?",
      a: "A dedicated page per service, a click-to-call number visible above the fold on mobile, a 24/7 badge if you offer emergency work, a response-time promise, named reviews with cities attached, and city-level pages for the towns you actually serve. Plus a load time under two seconds on a phone.",
    },
    {
      q: "Do HVAC companies need separate pages for each service?",
      a: "Yes. Someone searching 'duct cleaning Orem' has different intent than someone searching 'new furnace cost Provo', and one combined services page can't rank well for both. Eight well-built service pages will out-earn one page listing eight bullet points every time.",
    },
    {
      q: "How important is Google Business Profile for HVAC?",
      a: "For emergency and near-me searches it's often where most of the leads come from — the map pack sits above organic results and takes a large share of the clicks. Set your service area to every city you actually cover, pick the primary category that matches your highest-volume work, upload photos of real jobs, and respond to every review.",
    },
    {
      q: "Is a new website the right fix for an HVAC company with no calls?",
      a: "Not always. If your site is technically sound and the gap is a thin Google Business Profile or a review count in single digits, fix those first — it costs far less and often moves more. A rebuild is right when the site's structure can't carry the service and city searches you need to win.",
    },
  ],
  relatedLinks: [
    { href: "/hvac-website-design-utah", label: "HVAC website design in Utah" },
    { href: "/blog-get-more-leads-utah-website", label: "How to get more leads from your site" },
    { href: "/blog-utah-website-checklist", label: "The Utah website checklist" },
    { href: "/blog-website-cost-utah", label: "What a website costs in Utah" },
  ],
  moneyPage: { href: "/hvac-website-design-utah", label: "SEE HVAC WEB DESIGN" },
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
        Search &ldquo;AC repair Salt Lake City&rdquo; right now. Paid ads from
        national aggregators, a map pack dominated by companies with hundreds of
        reviews, organic listings from franchises with full marketing
        departments. Somewhere in that, your site has to show up, load fast, and
        convince a hot, irritated homeowner to call you instead of the next
        result.
      </p>
      <p>
        Most HVAC websites aren&rsquo;t built for that fight. They&rsquo;re built
        to exist: logo, phone number, list of services, stock photo of a
        technician smiling at an air handler. That&rsquo;s presence, not
        strategy, and presence doesn&rsquo;t generate calls in this market.
      </p>

      <h2>The number one mistake: sounding like everyone else</h2>
      <p>
        &ldquo;We provide quality heating and cooling services to the greater Salt
        Lake area.&rdquo; That sentence could belong to any of the two hundred-odd
        HVAC companies along the Wasatch Front. Google knows it. So does the
        homeowner reading it.
      </p>
      <p>
        Generic copy is both an SEO problem and a conversion problem. A page about
        furnace ignitor replacement in Sandy, with real detail on the failure
        modes you see most often, is more useful than a page that says &ldquo;we
        fix furnaces&rdquo; — and Google is built to surface the more useful page.
        From the prospect&rsquo;s side, if you read like the next three results,
        the decision falls to whoever has more reviews or a lower price. You
        don&rsquo;t want to compete on price.
      </p>

      <h2>Service pages, not a service list</h2>
      <p>
        This is the single most impactful structural change an HVAC site can make.
        Instead of listing everything on one page, give every service its own
        page. AC repair. Furnace installation. Duct cleaning. Heat pump service.
        Thermostat installation. Mini-split installation. Each with its own URL,
        title tag and content.
      </p>
      <p>
        The reason is intent. Someone searching &ldquo;duct cleaning Orem&rdquo;
        wants something different from someone searching &ldquo;new furnace cost
        Provo.&rdquo; One page can&rsquo;t rank well for both. Two dedicated
        pages, each matching a query, can.
      </p>
      <blockquote>
        A site with eight well-built service pages will out-rank a site with one
        services page listing eight bullet points. Every page is another chance to
        match a search your competitors are ignoring.
      </blockquote>
      <p>
        Each one should cover what the service involves, the scenarios that
        trigger the need so the visitor sees themselves in it, your service area,
        and a clear next step. If you can publish a starting-at price, better
        still — transparency builds trust and filters out tire-kickers.
      </p>

      <h2>Build for the emergency search</h2>
      <p>
        A large share of HVAC search volume is urgent. An AC dies in July in St.
        George. A furnace quits on a January night in Logan. Those people
        aren&rsquo;t comparing five websites — they&rsquo;re calling the first
        company that looks credible and is easy to reach.
      </p>
      <ul>
        <li>
          <strong>Click-to-call above the fold.</strong> Not in the footer, not
          behind a form. A tappable number visible the instant the page paints on
          mobile.
        </li>
        <li>
          <strong>A visible 24/7 badge</strong> if you offer emergency service.
          Say it loudly and early.
        </li>
        <li>
          <strong>A response-time promise.</strong> &ldquo;Same-day
          service&rdquo; or &ldquo;60-minute response in Salt Lake County&rdquo;
          gives someone a concrete reason to pick you.
        </li>
      </ul>
      <p>
        Emergency searches also skew hyper-local. &ldquo;AC not working Sandy
        Utah&rdquo; and &ldquo;furnace won&rsquo;t turn on Lehi&rdquo; are real
        queries. City-level pages and a properly configured profile catch traffic
        that broader competitors miss.
      </p>

      <h2>Write for Utah&rsquo;s seasons</h2>
      <p>
        Utah has real seasons and HVAC search behavior follows them. Furnace
        tune-up searches spike every October. AC installation picks up in April.
        Swamp cooler questions are a reliable spring query along the Wasatch
        Front. &ldquo;Furnace not blowing hot air&rdquo; peaks in December.
      </p>
      <p>
        Your site should be structured to catch that year-round, which means
        seasonal relevance built into the service pages themselves rather than one
        blog post written in 2023 and forgotten. Your AC page should talk about
        high-altitude desert cooling loads. Your furnace page should mention
        pre-season inspections and what an aging system costs to run through a
        Wasatch winter. That&rsquo;s not keyword stuffing — it&rsquo;s writing
        about the climate your customers actually live in.
      </p>

      <h2>The homepage pattern that converts</h2>
      <ul>
        <li>
          <strong>A headline naming your city and your top service.</strong>{" "}
          &ldquo;Salt Lake City&rsquo;s trusted AC repair and furnace
          installation&rdquo; beats &ldquo;welcome to our website.&rdquo;
        </li>
        <li>
          <strong>A trust bar.</strong> Years in business, license number, BBB
          status, review average and count. Five seconds of scanning answers
          &ldquo;can I trust these people&rdquo; before it becomes a barrier.
        </li>
        <li>
          <strong>Three or four services, each linking to its full page.</strong>{" "}
          Not everything you do. This funnels visitors deeper and builds the
          internal link structure Google reads.
        </li>
        <li>
          <strong>Named review quotes.</strong> &ldquo;Mike R., Draper&rdquo;
          carries more weight than an anonymous five stars.
        </li>
        <li>
          <strong>Click-to-call and a form, both, above the fold.</strong> Some
          people call, some fill in forms. Give both without scrolling.
        </li>
      </ul>
      <p>
        That pattern answers the three questions every HVAC prospect has: do you
        serve my area, can I trust you, how do I reach you.
      </p>

      <h2>Speed, and where I&rsquo;d spend your money first</h2>
      <p>
        A homeowner with a dead AC in July is searching on a phone, standing in a
        hot house. If your site takes five seconds, they&rsquo;ve already tapped
        the next result. Google&rsquo;s own research on mobile performance found
        bounce probability climbing steeply as load time stretches from one second
        toward five. Under two seconds on mobile is the bar.
      </p>
      <p>
        What kills it: a 4 MB hero image that should be 150 KB, a theme loading
        plugin scripts the page never uses, third-party chat and review widgets
        adding a few hundred milliseconds each, and shared hosting with slow
        response times.
      </p>
      <p>
        Here&rsquo;s the honest order of operations, though. If your site is
        technically fine and your Google Business Profile is half-empty with
        eleven reviews, don&rsquo;t buy a website from me. Fix the profile, chase
        reviews for a quarter, and see where you land. A rebuild is worth it when
        the structure itself can&rsquo;t carry the service and city searches you
        need — and at that point{" "}
        <Link href="/hvac-website-design-utah">
          an HVAC site built for this market
        </Link>{" "}
        is a solvable problem with a fixed number attached.
      </p>
    </ArticlePage>
  );
}
