import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { ArticlePage, type ArticleMeta } from "@/components/templates/ArticlePage";

const TITLE = "How to Get More Leads from Your Utah Business Website";
const DESCRIPTION =
  "Practical steps to turn your Utah business website into a lead generation system — from SEO fixes to conversion optimization.";

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/blog-get-more-leads-utah-website",
});

const META: ArticleMeta = {
  slug: "/blog-get-more-leads-utah-website",
  title: TITLE,
  description: DESCRIPTION,
  h1: "How to get more leads from your Utah business website",
  lede: "Your site can look great and still produce nothing. Eight fixes in the order I'd actually do them — starting with the one that tells you which of the other seven you need.",
  datePublished: "2026-04-08",
  dateModified: "2026-07-31",
  readingTime: "6 min read",
  category: "Web Design",
  faq: [
    {
      q: "Why does my website get traffic but no leads?",
      a: "Almost always one of three things: the page people land on doesn't match what they searched for, the next step is buried or vague, or there's no proof on the page that you're worth calling. Check Search Console for which queries bring people in, then look at whether the landing page actually answers that query.",
    },
    {
      q: "How long before SEO changes produce leads?",
      a: "Technical and conversion fixes — click-to-call, a form above the fold, clearer CTA language — can move numbers within weeks because they work on traffic you already have. New pages targeting new queries usually take three to six months to rank and compound from there.",
    },
    {
      q: "Should I put pricing on my website?",
      a: "Yes, or at least a range. I publish mine: websites $3,000–$9,000, custom software from $25,000, managed plans from $375/month. Ranges filter out people who were never going to buy and pre-qualify the ones who fill in the form. You get fewer submissions and better conversations.",
    },
    {
      q: "Is Google Business Profile more important than my website?",
      a: "For local service searches, the map pack often takes a bigger share of clicks than the organic results below it — so the profile is doing a lot of work. But the two feed each other. A complete profile with real photos and consistent reviews plus a site with real depth beats either one alone.",
    },
  ],
  relatedLinks: [
    { href: "/blog-utah-website-checklist", label: "The Utah website checklist" },
    { href: "/blog-why-service-business-websites-dont-convert", label: "Why websites don't convert" },
    { href: "/blog-hvac-website-design-utah", label: "HVAC website design in Utah" },
    { href: "/pricing", label: "Published pricing" },
  ],
  moneyPage: { href: "/web-design-utah", label: "SEE UTAH WEB DESIGN" },
};

export default function Page() {
  return (
    <ArticlePage meta={META}>
      <p>
        There are two versions of this problem. Either your site has decent
        traffic and almost no leads, or it has no traffic and no leads. Both are
        fixable. The fixes are completely different, and most owners are
        guessing at which one they have.
      </p>
      <p>
        The answer is almost never a redesign for the sake of looking better.
        It&rsquo;s structural: show up in the right searches, speak to the right
        buyer, make the next step obvious, and give someone enough reason to
        pick up the phone.
      </p>

      <h2>1. Find out where you actually stand</h2>
      <p>
        Before you change anything, open Google Search Console. It shows which
        queries your site appears for, how many impressions and clicks you get,
        and your average position. If it isn&rsquo;t set up and verified, stop
        reading and go do that — without it you&rsquo;re making decisions on
        feelings.
      </p>
      <p>Then read it for one of three patterns:</p>
      <ul>
        <li>
          <strong>Impressions but few clicks.</strong> Your titles and
          descriptions aren&rsquo;t earning the click, or you&rsquo;re sitting on
          page two where nobody scrolls.
        </li>
        <li>
          <strong>Clicks but no conversions.</strong> The landing page
          doesn&rsquo;t match the intent behind the query, or the path to
          contacting you is buried.
        </li>
        <li>
          <strong>Low impressions across the board.</strong> You don&rsquo;t have
          enough indexed content aimed at what your customers actually type.
        </li>
      </ul>
      <p>
        Each one points at a different lever. Pull the wrong one and you spend
        three months on the wrong problem.
      </p>

      <h2>2. Fix the two things that control visibility</h2>
      <h3>Your Google Business Profile</h3>
      <p>
        For Utah service businesses this is the highest-leverage free asset you
        own. It drives the map pack that sits above organic results, and for
        &ldquo;plumber near me&rdquo; or &ldquo;HVAC repair Orem&rdquo; that
        block takes a large share of the clicks.
      </p>
      <ul>
        <li>Claim and verify the listing.</li>
        <li>
          Upload real photos — your trucks, your crew, finished work. Not stock.
        </li>
        <li>
          Fill in every service category that applies. Be specific: furnace
          installation and AC repair are separate categories and each one surfaces
          in different searches.
        </li>
        <li>Respond to every review inside 48 hours, good or bad.</li>
        <li>Post monthly. Seasonal tips, completed projects, promotions.</li>
      </ul>

      <h3>Pages that match search intent</h3>
      <p>
        This is where most Utah business sites fall down. Home, about, one
        services page, contact. That structure can&rsquo;t rank for more than a
        handful of queries because nothing on it is specifically about anything.
      </p>
      <p>
        The fix is one page per service per city that matters. &ldquo;AC repair
        Salt Lake City&rdquo; and &ldquo;furnace installation Provo&rdquo; are
        different searches by different people with different urgency. They
        deserve different pages — each with the service and city in the title
        tag, a unique H1, 400+ words that genuinely help, and a clear next step.
      </p>
      <p>
        That&rsquo;s the whole foundation of{" "}
        <Link href="/web-design-utah">
          web design for Utah service businesses
        </Link>{" "}
        that actually produces work: pages built around how people search, not
        how your org chart is arranged.
      </p>

      <h2>3. Make the next step impossible to miss</h2>
      <p>
        If someone has to hunt for a way to contact you, they&rsquo;re gone.
        What &ldquo;impossible to miss&rdquo; looks like:
      </p>
      <ul>
        <li>
          <strong>Click-to-call on mobile.</strong> Tappable in the header and in
          the body of every service page. Most local searches happen on phones.
        </li>
        <li>
          <strong>A short form above the fold.</strong> Name, phone, one line
          about the job. Nobody should scroll to find it.
        </li>
        <li>
          <strong>Specific action language.</strong> &ldquo;Get a free
          estimate&rdquo; beats &ldquo;Contact us.&rdquo; &ldquo;Schedule your AC
          inspection&rdquo; beats &ldquo;Learn more.&rdquo; Tell people exactly
          what they get.
        </li>
        <li>
          <strong>Phone number in the header on every page.</strong> Not just
          contact. Not the footer.
        </li>
      </ul>
      <p>
        This isn&rsquo;t about being pushy. It&rsquo;s about shortening the gap
        between &ldquo;I need this&rdquo; and &ldquo;I asked for a quote.&rdquo;
      </p>

      <h2>4. Give them a reason to believe you</h2>
      <p>
        When a homeowner is about to spend a few thousand dollars on a water
        heater — or well into five figures on a full HVAC system — a clean design
        doesn&rsquo;t reassure them. Specifics do.
      </p>
      <ul>
        <li>
          <strong>Named reviews on the page.</strong> Not a link to Yelp. Actual
          quotes with first names and cities. &ldquo;John R., Sandy&rdquo; carries
          more weight than an anonymous five stars.
        </li>
        <li>
          <strong>Years in business.</strong> &ldquo;Serving Utah since
          2009&rdquo; separates you from a company founded last month.
        </li>
        <li>
          <strong>License and insurance numbers.</strong> Most competitors
          don&rsquo;t bother. It costs you nothing.
        </li>
        <li>
          <strong>Real project photos.</strong> Before-and-after from actual
          jobs. People can tell the difference between your work and a stock
          technician.
        </li>
        <li>
          <strong>A price range.</strong> You don&rsquo;t need a full rate card.
          A number filters out people who were never going to buy. I publish mine
          for the same reason.
        </li>
      </ul>

      <h2>5. Speed, supporting content, and measurement</h2>
      <p>
        <strong>Speed</strong> affects both rankings and conversions, and mobile
        connections in Utah County and the Wasatch Back are not always generous.
        Run PageSpeed Insights. Under 80 on mobile means you&rsquo;re leaving
        rankings and visitors behind. The usual culprits: a hero image that could
        be 150 KB and is 3 MB, unused CSS and JavaScript from a theme with a
        dozen plugins, and shared hosting at four dollars a month.
      </p>
      <p>
        <strong>Supporting content</strong> is not thought leadership. It&rsquo;s
        a systematic way to catch long-tail searches — &ldquo;how much does a
        furnace replacement cost in Utah,&rdquo; &ldquo;signs your water heater
        is about to fail&rdquo; — and pass authority to the pages you want to
        rank. Every post should link to at least one service page. That
        internal link is the entire point. One genuinely useful post a week
        builds meaningful traffic inside six months.
      </p>
      <p>
        <strong>Measurement</strong> turns this from guesswork into a process. In
        GA4, set conversion events for every form submission and every
        click-to-call tap. Connect Search Console so you can see which queries
        convert, not just which ones rank. Check source and medium monthly so you
        know whether leads come from organic, Maps, ads or referrals.
      </p>

      <h2>Which of these do you actually need?</h2>
      <p>
        Most businesses only need to fix three or four items on this list to see
        a real change. The honest part: if your site is fundamentally sound and
        the gap is your Google Business Profile, hiring me to rebuild it would be
        a waste of your money. Do step one, then fix the cheapest thing it points
        at.
      </p>
      <p>
        If the structure itself is the problem — one services page trying to
        cover eleven services in four cities — that&rsquo;s a rebuild, and{" "}
        <Link href="/pricing">what that costs is published</Link> before you talk
        to anyone.
      </p>
    </ArticlePage>
  );
}
