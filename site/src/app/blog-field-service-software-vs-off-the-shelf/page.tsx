import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { ArticlePage, type ArticleMeta } from "@/components/templates/ArticlePage";

const TITLE = "Field Service Software: When Off-the-Shelf Breaks Down";
const DESCRIPTION =
  "The signs your field operation has outgrown generic software — and why custom field service platforms become the better financial and operational decision.";

const META: ArticleMeta = {
  slug: "/blog-field-service-software-vs-off-the-shelf",
  title: TITLE,
  description: DESCRIPTION,
  h1: "When off-the-shelf field service software starts breaking down",
  lede: "There's a point where a generic field service tool stops saving time and starts creating the exact friction it was bought to remove. Most teams feel it long before they can name it.",
  datePublished: "2026-03-12",
  readingTime: "4 min read",
  category: "Field Operations",
  faq: [
    {
      q: "How do I know if my team has outgrown its field service software?",
      a: "Watch for exceptions becoming routine. If your crew has to explain the same edge case every week — a site with no real address, travel pay across a state line, one crew clocking against two purchase orders — the software is no longer modeling your business and people are covering the gap.",
    },
    {
      q: "Is this a training problem or a software problem?",
      a: "Training fixes people using a tool wrong. If the tool cannot represent what actually happens, more training just makes your team faster at working around it. The test: can the platform record the exception correctly at all? If not, it's a software problem.",
    },
    {
      q: "What does custom field service software change day to day?",
      a: "Time capture can be drafted automatically from real job activity. Dispatch can reflect actual constraints instead of a simplified model. Job costing maps to how revenue and payroll really work. Managers see status without waiting for the week to end and reconciling it.",
    },
    {
      q: "Should every field service company build custom software?",
      a: "No. If your jobs are standard and a platform like Jobber or ServiceTitan holds your workflow without workarounds, keep paying for it — that's the cheaper answer and I'll say so on a call. Custom earns its cost when the workarounds have become the operation.",
    },
  ],
  relatedLinks: [
    { href: "/blog-servicetitan-vs-custom-software", label: "ServiceTitan vs. custom software" },
    { href: "/blog-jobber-vs-custom-software", label: "Jobber vs. custom software" },
    { href: "/blog-how-to-know-youve-outgrown-spreadsheets", label: "Outgrowing spreadsheets" },
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
        If your team still has to explain the same exception over and over — this
        site has no real address, this crew gets travel pay across state lines,
        this job has two purchase orders but one crew clocking time against it —
        the problem isn&rsquo;t training. It&rsquo;s the model the software is
        built on.
      </p>
      <p>
        Most field service platforms assume standardized home-service work:
        predictable dispatch, clean addresses, simple billing logic, and a
        manager who can see everything by end of day. That holds up well right up
        until your operation stops looking average.
      </p>

      <h2>Sign one: your edge cases became the daily workflow</h2>
      <p>
        At first, teams work around the gaps. They keep a spreadsheet. They text
        updates. They fix timecards manually on Friday. They invent a
        side-process for each exception. Eventually the exceptions are normal,
        and your real workflow lives outside the software you&rsquo;re paying
        for.
      </p>
      <blockquote>
        A useful rule: if your team relies on memory, a group chat or a
        spreadsheet to finish work correctly, the software is no longer carrying
        the operation. People are.
      </blockquote>

      <h2>Sign two: reporting only works after cleanup</h2>
      <p>
        When a manager can&rsquo;t trust the numbers without reconciling them
        first, you don&rsquo;t have operational visibility. You have an
        after-the-fact reconstruction exercise. It shows up as Monday-morning
        uncertainty, payroll corrections, and invoices going out later than they
        should.
      </p>
      <p>
        This is usually where the money argument starts to matter. Cleanup work
        eats margin quietly, week after week, and nobody has a line item for it.
      </p>

      <h2>Sign three: the platform can&rsquo;t model how you get paid</h2>
      <p>
        Multi-rate pay, travel rules, union logic, multiple job codes, split
        billing, odd site constraints — this is where generic tools give out. If
        the platform can&rsquo;t represent how work actually happens, your team
        becomes the translation layer between reality and the database.
      </p>
      <p>
        That&rsquo;s the point where custom stops being a luxury and starts being
        infrastructure. It&rsquo;s the same trade-off I break down in the{" "}
        <Link href="/blog-servicetitan-vs-custom-software">
          ServiceTitan vs. custom software
        </Link>{" "}
        comparison, with the five-year arithmetic attached.
      </p>

      <h2>What actually changes</h2>
      <p>
        A custom field operations platform doesn&rsquo;t just swap one dashboard
        for another. It lets the business encode logic that currently lives in
        people&rsquo;s heads. Time tracking gets drafted automatically. Dispatch
        reflects real constraints. Job costing maps to how revenue and payroll
        genuinely work. Managers see what matters without waiting for the week to
        close.
      </p>
      <p>
        The difference isn&rsquo;t feature count. It&rsquo;s that the software
        finally fits the operation instead of forcing the operation to fit the
        software.
      </p>

      <h2>When to ignore all of this</h2>
      <p>
        If your jobs are standard and your platform holds them without a single
        workaround, none of this applies to you. Keep the subscription. Jobber and
        ServiceTitan are good products and replacing a tool that fits is an
        expensive way to end up where you started.
      </p>
      <p>
        The trigger isn&rsquo;t frustration and it isn&rsquo;t company size.
        It&rsquo;s the moment your team stops working through the software and
        starts working around it. If that&rsquo;s where you are,{" "}
        <Link href="/field-service-software">
          a platform built around your actual operation
        </Link>{" "}
        is worth a scope and a real number before you renew anything.
      </p>
    </ArticlePage>
  );
}
