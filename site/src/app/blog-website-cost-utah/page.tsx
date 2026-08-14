import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { ArticlePage, type ArticleMeta } from "@/components/templates/ArticlePage";

const TITLE = "How Much Does a Website Cost in Utah in 2026? | MDS Blog";
const DESCRIPTION =
  "A breakdown of website costs in Utah for 2026 — from DIY builders to custom-coded sites. Real numbers, hidden costs, and what drives ROI.";

const META: ArticleMeta = {
  slug: "/blog-website-cost-utah",
  title: TITLE,
  description: DESCRIPTION,
  h1: "How much does a website cost in Utah in 2026?",
  lede: "Real ranges for real businesses — what each tier buys you, what moves the number inside a tier, the costs that show up after you've signed, and why the sticker price is the wrong thing to stare at.",
  datePublished: "2026-03-25",
  dateModified: "2026-07-31",
  readingTime: "7 min read",
  category: "Web Design",
  faq: [
    {
      q: "How much does a custom website cost in Utah?",
      a: "A custom-coded site from me runs $3,000–$9,000 and ships in 1–4 weeks. The low end is a five-to-seven page lead-generation site; the high end adds service and city landing pages, custom form logic, integrations and a content structure built to keep growing. DIY builders cost a few hundred a year, template freelance work runs roughly $500–$2,500, and full agency builds start around $12,000.",
    },
    {
      q: "What actually drives the price of a website up?",
      a: "Page count first, then anything with logic behind it: multi-step forms that route to a CRM, booking, payments, integrations with software you already run. Copywriting adds roughly 15–25 percent if you need every headline and service description written from scratch.",
    },
    {
      q: "Is a Wix or Squarespace site good enough?",
      a: "Sometimes, genuinely. If your work comes from referrals and the site is a business card, a DIY builder is the right buy and I'll say so. The ceiling is low if you're trying to win competitive local search — you can't control render behavior, schema or page architecture with much precision — but a cheap site you actually need beats an expensive one you don't.",
    },
    {
      q: "What ongoing costs come after launch?",
      a: "A domain is $12–$20 a year. Static hosting for a custom site runs $5–$15 a month. SSL is free through Let's Encrypt. A custom site needs effectively no maintenance; a WordPress site needs plugin, theme and PHP updates, which is $50–$150 a month if you outsource it. Managed plans with me start at $375/month and are optional, never required.",
    },
    {
      q: "How long does a website take to build?",
      a: "One to four weeks, depending on scope and how fast content comes back. Sites ship with a 90-day bug warranty.",
    },
  ],
  relatedLinks: [
    { href: "/web-design-utah", label: "Utah web design service" },
    { href: "/blog-wordpress-vs-custom-code", label: "WordPress vs. custom code" },
    { href: "/blog-utah-website-checklist", label: "The Utah website checklist" },
    { href: "/blog-why-service-business-websites-dont-convert", label: "Why websites don't convert" },
  ],
  moneyPage: { href: "/pricing", label: "SEE PUBLISHED PRICING" },
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
        I get some version of &ldquo;how much does a website cost&rdquo; every
        week. The honest answer is always the same: depends what you need it to
        do.
      </p>
      <p>
        That&rsquo;s not a dodge. You can&rsquo;t call a contractor and ask what
        a building costs without saying whether it&rsquo;s a shed or a
        warehouse. A five-page site for a solo landscaper and a thirty-page site
        with booking, payments and a customer portal are different projects that
        happen to share a word.
      </p>
      <p>
        So instead of a number, here&rsquo;s how website pricing actually works
        in Utah right now — the tiers, what moves the price inside a tier, and
        how to think about return instead of expense.
      </p>

      <h2>The four tiers, and who each one is for</h2>
      <h3>DIY builders — a few hundred dollars a year</h3>
      <p>
        Wix, Squarespace and GoDaddy let you drag a site together for a monthly
        fee. Call it $16–$45 a month, so roughly $200–$540 a year.
      </p>
      <p>
        The trade-offs are real: templates cap your layout, page speed is
        mediocre because you load the platform&rsquo;s whole framework whether
        you use it or not, SEO control is shallow, and you don&rsquo;t own the
        code. If you ever leave, you start over.
      </p>
      <p>
        And here&rsquo;s the part most people in my position won&rsquo;t say: for
        some businesses that&rsquo;s the correct purchase. If every job comes from
        referrals and the site exists so people can confirm you&rsquo;re real, buy
        Squarespace and put the difference into trucks. A cheap site you need
        beats an expensive site you don&rsquo;t.
      </p>

      <h3>Freelance template sites — roughly $500 to $2,500</h3>
      <p>
        A freelancer buys a WordPress or Shopify theme, drops in your branding
        and content, and hands it over. You typically get three to seven pages, a
        contact form, mobile responsiveness and some light SEO setup.
      </p>
      <p>
        It looks better than what you&rsquo;d build yourself. The catch is that
        the code underneath isn&rsquo;t yours, the structure isn&rsquo;t built
        around search intent, and six months later when a plugin breaks, you may
        not have anyone to call.
      </p>

      <h3>Custom-coded sites — $3,000 to $9,000</h3>
      <p>
        This is where I work. Every line is written for your business. No theme,
        no page builder, no plugin stack. That&rsquo;s what makes a{" "}
        <Link href="/web-design-utah">custom Utah website</Link> load fast enough
        to hold a mobile visitor and clean enough for Google to parse without
        effort.
      </p>
      <p>
        Around $3,000–$4,500 you&rsquo;re looking at a five-to-seven page site:
        home, about, services, a couple of service-specific landing pages, and
        contact. Fast, mobile-first, technical SEO built in from the start,
        analytics handed over, source code yours.
      </p>
      <p>
        Around $5,000–$7,000 you add depth: eight to fourteen pages, service and
        city landing pages targeting local search, blog architecture, schema
        markup, Google Business Profile setup, and a multi-step lead form that
        routes where you need it.
      </p>
      <p>
        Around $7,000–$9,000 you&rsquo;re adding integrations and scale — API
        connections to scheduling, payment or review platforms, advanced form
        logic, more pages, and the structure to keep publishing without a
        rebuild.
      </p>
      <p>
        The results are measurable, which is the only reason I&rsquo;m willing to
        publish ranges. BK Toolbox shipped at 100 SEO and 99 performance on
        Lighthouse. CCL Pro captured 40% more leads after restructuring.
      </p>

      <h3>Full agency builds — $12,000 and up</h3>
      <p>
        Agencies charge enterprise rates because they staff a project manager, a
        designer, a developer, QA and sometimes a copywriter. The deliverable is
        polished. A meaningful chunk of the budget goes to coordination rather
        than output.
      </p>
      <p>
        For a national brand, that overhead buys real things. For a Utah service
        business running a crew of five to thirty, it&rsquo;s almost always
        paying for org structure instead of a proportionally better website. I
        contributed to GoodFirms&rsquo; 2026 research on what development firms
        actually charge, and the headline matched what I see here: the projects
        at the top of the range usually aren&rsquo;t websites at all. They&rsquo;re
        platforms with custom software behind them.
      </p>

      <h2>What moves the number inside a tier</h2>
      <ul>
        <li>
          <strong>Page count.</strong> Each page needs content, design, SEO
          structure and testing. A five-page and a twenty-page site are different
          jobs.
        </li>
        <li>
          <strong>Forms with logic.</strong> A contact form is trivial. A
          multi-step quote request that routes to a CRM, texts you, and starts an
          email sequence is a small piece of software.
        </li>
        <li>
          <strong>E-commerce.</strong> Catalog, payments, inventory and shipping
          logic add real complexity even at twenty products.
        </li>
        <li>
          <strong>Booking and scheduling.</strong> Either a third-party
          integration or a custom build. Both cost money.
        </li>
        <li>
          <strong>Copywriting.</strong> Some designers write copy, most
          don&rsquo;t. If you need every headline and service description written
          from scratch, add 15–25 percent.
        </li>
      </ul>

      <h2>The costs that show up after you sign</h2>
      <ul>
        <li>
          <strong>Domain:</strong> $12–$20 a year for a .com. Skip the premium
          ones.
        </li>
        <li>
          <strong>Hosting:</strong> $5–$15 a month for a static site. WordPress
          on managed hosting runs $25–$50.
        </li>
        <li>
          <strong>SSL:</strong> free with any modern host. If someone is billing
          you $100 a year for a certificate, ask why.
        </li>
        <li>
          <strong>Maintenance:</strong> WordPress needs plugin updates, security
          patches and PHP version management — budget $50–$150 a month if
          you&rsquo;re outsourcing. A static custom site needs close to nothing,
          which is one of the reasons I build them that way.
        </li>
        <li>
          <strong>Plugin renewals:</strong> forms, SEO, caching and backup
          licenses add up to $300–$800 a year on WordPress. On a custom site
          those are just features.
        </li>
        <li>
          <strong>Email:</strong> Google Workspace is about $7 per user per
          month. Get professional email at your domain. Don&rsquo;t skip it.
        </li>
      </ul>
      <p>
        Run the three-year version. A builder at $27 a month is $972 over three
        years for a site you don&rsquo;t own and can&rsquo;t take with you. A
        custom site at $3,500 with $10-a-month hosting is $3,860 over the same
        stretch — and at the end you still own every file.
      </p>

      <h2>The question that actually matters</h2>
      <p>
        Cost without context is meaningless. Say you&rsquo;re an HVAC company in
        Utah County and your average job is around $2,500. A site that ranks for
        &ldquo;AC repair Provo&rdquo; and brings in five qualified leads a month,
        three of which close, is $7,500 a month in revenue from a page that never
        calls in sick and never takes a commission.
      </p>
      <p>
        Compare that to what you pay elsewhere. An Angi or HomeAdvisor lead in
        Utah runs $15–$80 depending on the trade, and you&rsquo;re competing
        against three to five other businesses for the same homeowner. Google Ads
        for HVAC keywords along the Wasatch Front cost $25–$60 per click — not
        per lead, per click. At a five percent conversion rate that&rsquo;s
        $500–$1,200 per lead through paid search.
      </p>
      <p>
        Organic leads from a site you own cost nothing after the build. That
        math isn&rsquo;t close, which is also why the cheapest option
        isn&rsquo;t automatically the smartest one. A $300 site that generates
        nothing has an infinite cost per lead.
      </p>

      <h2>So what should you actually spend?</h2>
      <ul>
        <li>
          <strong>New and bootstrapping:</strong> a clean five-page custom site
          around $3,000–$4,500. Get the foundation right; add pages later.
        </li>
        <li>
          <strong>Established and growing:</strong> $5,000–$7,000 buys the
          service and city pages, the local SEO structure and the lead capture
          system where organic traffic starts compounding.
        </li>
        <li>
          <strong>Scaling and competing hard:</strong> $7,000–$9,000 with
          integrations and a content structure that gets stronger every month.
        </li>
      </ul>
      <p>
        In every case: build something that earns more than it costs. My full{" "}
        <Link href="/pricing">pricing is published</Link>, including a builder
        that prices your scope before you talk to me. A website that
        doesn&rsquo;t generate business isn&rsquo;t an asset — it&rsquo;s a
        line item.
      </p>
    </ArticlePage>
  );
}
