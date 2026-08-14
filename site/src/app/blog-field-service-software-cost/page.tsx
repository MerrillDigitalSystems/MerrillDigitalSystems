import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { ArticlePage, type ArticleMeta } from "@/components/templates/ArticlePage";

const TITLE = "How Much Does Field Service Software Cost? (2026)";
const DESCRIPTION =
  "A plain breakdown of field service software pricing in 2026 — subscriptions, setup fees, hidden costs, and when a custom build pays off.";

const META: ArticleMeta = {
  slug: "/blog-field-service-software-cost",
  title: TITLE,
  description: DESCRIPTION,
  h1: "How much does field service software cost?",
  lede: "The sticker price is the easy part. The number that decides this is what the software costs you over five years — subscription, setup, and the hours your crew burns working around a tool that almost fits.",
  datePublished: "2026-07-07",
  dateModified: "2026-07-31",
  readingTime: "6 min read",
  category: "Field Operations",
  faq: [
    {
      q: "What does field service software cost per month?",
      a: "Entry-level tools for small crews run roughly $30–$60 per user per month. Mid-market platforms with dispatch, inventory and real reporting run roughly $80–$200 per user per month, usually with a minimum seat count. Enterprise platforms don't publish pricing at all — you get a quote with an implementation fee attached.",
    },
    {
      q: "How much does a custom field service platform cost to build?",
      a: "Custom software starts at $25,000, and most V1 builds land between $25,000 and $65,000 depending on how many workflows it replaces. After launch you pay for hosting and any changes you choose to make — managed plans start at $375/month. There is no per-seat fee, so the cost doesn't move when you hire.",
    },
    {
      q: "At what crew size does custom software start making financial sense?",
      a: "Usually somewhere past eight to ten seats, and only when there's real workaround cost on top of the subscription. Below that, per-seat pricing is genuinely cheaper than owning, and I'll tell you so. The seat count alone isn't the trigger — the trigger is seats plus the hours your office spends translating between tools.",
    },
    {
      q: "What costs get left out of a software quote?",
      a: "Onboarding and implementation fees, data migration, integration work, training time, and the workaround tax — the weekly hours your team spends on spreadsheets and manual exports because the platform doesn't quite match how you dispatch or bill. The last one never appears on an invoice, which is exactly why it's the expensive one.",
    },
  ],
  relatedLinks: [
    { href: "/blog-jobber-vs-custom-software", label: "Jobber vs. custom software" },
    { href: "/blog-servicetitan-vs-custom-software", label: "ServiceTitan vs. custom software" },
    { href: "/blog-field-service-software-vs-off-the-shelf", label: "When off-the-shelf breaks down" },
    { href: "/pricing", label: "Published pricing, no quote form" },
  ],
  moneyPage: { href: "/field-service-software", label: "SEE FIELD SERVICE SOFTWARE" },
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
        Every field service owner I talk to asks this early, usually in the
        first ten minutes: what does this stuff actually cost? The honest answer
        is that the monthly price on a pricing page is normally the smallest
        number in the equation.
      </p>
      <p>
        So here&rsquo;s the whole equation. Subscription, setup, and the part
        nobody quotes.
      </p>

      <h2>The short answer, in three tiers</h2>
      <p>
        Off-the-shelf field service platforms sort themselves into three bands.
        Entry-level tools built for small crews run roughly{" "}
        <strong>$30–$60 per user per month</strong>. Mid-market platforms with
        dispatch, inventory and reporting that goes past the basics run roughly{" "}
        <strong>$80–$200 per user per month</strong>, usually with a minimum seat
        count you pay whether you fill it or not. Enterprise platforms don&rsquo;t
        publish pricing at all — you get a custom quote, generally with an
        implementation fee measured in thousands and a per-seat rate that climbs
        every time you turn on an add-on.
      </p>
      <p>
        A custom build is a different shape of number entirely. It&rsquo;s a
        one-time cost — I start at $25,000, and most V1 builds land between
        $25,000 and $65,000 — after which you own the software outright and pay
        for hosting plus whatever changes you decide to make.
      </p>
      <blockquote>
        The subscription model scales with your headcount. The ownership model
        scales with your ambition. That one difference is the whole decision.
      </blockquote>

      <h2>Per-seat pricing has a built-in problem</h2>
      <p>
        Per-seat sounds fair until you notice which direction it runs. Hire five
        techs and your bill goes up five seats — for software that already
        existed and already worked yesterday. Growth costs you twice: once in
        payroll, once in license.
      </p>
      <p>
        Then there are the tiers. The feature you actually need — two-way
        texting, a second location, custom reporting, a clean accounting sync —
        is almost always one plan above the one you&rsquo;re on. That isn&rsquo;t
        an accident. The demo shows you the top tier; the quote lands you where
        the useful parts cost extra.
      </p>
      <p>
        And renewals move one direction. You find out about the increase in the
        same email that thanks you for your loyalty.
      </p>

      <h2>The costs nobody puts in the quote</h2>
      <p>
        When you&rsquo;re comparing platforms, add these to whatever the
        salesperson tells you:
      </p>
      <ul>
        <li>
          <strong>Onboarding and implementation.</strong> Enterprise platforms
          routinely charge a one-time fee to configure the system and move your
          data. It can rival a full year of subscription on its own.
        </li>
        <li>
          <strong>Data migration and integrations.</strong> Getting your customer
          list, job history and accounting data in — and keeping it in sync — is
          rarely free and rarely quick.
        </li>
        <li>
          <strong>Training and the productivity dip.</strong> Every hour a tech
          spends learning a tool is an hour off a job. New software always costs
          you before it pays you.
        </li>
        <li>
          <strong>The workaround tax.</strong> This is the big one. When the
          platform doesn&rsquo;t match how you dispatch or quote, your team
          invents a side process — a spreadsheet, a group text, a manual export
          every Friday. You pay that every single week, on top of the
          subscription.
        </li>
      </ul>
      <p>
        The workaround tax never appears on an invoice, which is precisely why
        it gets expensive. Nobody counts the hours, so nobody notices them
        stacking up.
      </p>

      <h2>The five-year math</h2>
      <p>
        Put rough numbers on it. Say you run ten techs on a mid-market platform
        at $150 per seat per month. That&rsquo;s $1,800 a month once you count
        the office seats, call it $21,600 a year, and about $108,000 over five
        years before a single price increase. Add an implementation fee, the
        integration work, and the seats you&rsquo;ll add as you grow, and the
        real five-year figure sits comfortably above $130,000.
      </p>
      <p>
        A custom build at $35,000 up front, plus a managed plan from $375/month
        for hosting, monitoring and ongoing changes, totals somewhere near
        $57,500 across the same five years. At the end you own an asset instead
        of a stack of receipts. Hire ten more techs and that number barely
        moves, while the subscription roughly doubles.
      </p>
      <p>
        That&rsquo;s the same comparison I run in more detail in the{" "}
        <Link href="/blog-servicetitan-vs-custom-software">
          ServiceTitan vs. custom software
        </Link>{" "}
        piece, one price tier up.
      </p>

      <h2>When a custom build actually pays off</h2>
      <p>Custom is not automatically the right answer. It wins in four cases:</p>
      <ul>
        <li>
          You have enough seats that the license is a real line item — usually
          past eight or ten.
        </li>
        <li>
          Your operation has edge cases the platform can&rsquo;t hold cleanly, so
          your team is already working around it.
        </li>
        <li>
          You&rsquo;re paying for two or three tools that don&rsquo;t talk, and
          re-keying the same job into each one.
        </li>
        <li>
          You plan to grow and you&rsquo;d rather your software bill didn&rsquo;t
          grow in lockstep with your headcount.
        </li>
      </ul>
      <p>
        If none of that is true — small crew, standard jobs, an off-the-shelf
        tool that fits — keep the subscription. Jobber is genuinely excellent at
        that size and I&rsquo;d rather you spent $99 a month than $35,000 with
        me. I say that on calls regularly, for free, and it costs me work.
        It&rsquo;s still the right answer.
      </p>
      <p>
        For Utah HVAC, plumbing, electrical and similar trades that have outgrown
        the template,{" "}
        <Link href="/field-service-software">
          field service software built around your actual workflow
        </Link>{" "}
        is where the math starts to flip.
      </p>

      <h2>How to decide without guessing</h2>
      <p>
        Don&rsquo;t start with the software. Start with your operation. Write
        down four numbers: how many seats you pay for, how fast you&rsquo;re
        adding them, how many separate tools are in the stack, and how many hours
        a week your office spends moving data between them by hand.
      </p>
      <p>
        Those four tell you more about your real cost than any pricing page will.
        Then compare the total — subscription plus setup plus drag — against a
        one-time build you&rsquo;d own. For a lot of growing field service
        companies, the number that looks scary up front is the cheaper number
        over five years. For plenty of others it isn&rsquo;t, and that&rsquo;s a
        perfectly good outcome too.
      </p>
    </ArticlePage>
  );
}
