import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { ArticlePage, type ArticleMeta } from "@/components/templates/ArticlePage";

const TITLE = "ServiceTitan vs. Custom Software - What Nobody Tells You";
const DESCRIPTION =
  "ServiceTitan fits average field service workflows until your team works around it. When custom software is the smarter long-term move for field ops.";

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/blog-servicetitan-vs-custom-software",
});

const META: ArticleMeta = {
  slug: "/blog-servicetitan-vs-custom-software",
  title: TITLE,
  description: DESCRIPTION,
  h1: "ServiceTitan vs. custom software — what nobody tells you",
  lede: "ServiceTitan is not bad software. For a certain size of company running a certain kind of operation it does exactly what it says. But there's a conversation the sales process never has with you, and it's the one worth having first.",
  datePublished: "2026-03-20",
  readingTime: "5 min read",
  category: "Operations Software",
  faq: [
    {
      q: "Is ServiceTitan worth it?",
      a: "If your operation looks like the statistical middle of the field service market — standard job types, standard dispatch, standard reporting — it fits well and the subscription is worth paying. The problems start when your team has to work around it, because then you're paying the subscription and absorbing the drag at the same time.",
    },
    {
      q: "How much does ServiceTitan cost?",
      a: "They don't publish it. You get a custom quote, typically with an implementation fee and a per-seat rate that rises as you add modules and users. That's normal for enterprise field service platforms, and it's why comparing it to a one-time build takes a five-year view rather than a monthly one.",
    },
    {
      q: "What does custom field service software actually replace?",
      a: "Usually dispatch, job tracking, time capture, job costing and the reporting layer — the parts your team is currently reconciling by hand. A V1 covers the workflows that carry the most manual work, not every feature on an enterprise feature list.",
    },
    {
      q: "How do I know if my operation is too unusual for an off-the-shelf platform?",
      a: "Count the exceptions your team has to explain more than once: sites without real addresses, travel pay rules, split billing, two purchase orders against one crew's time. If exceptions are now the daily workflow rather than the edge case, the platform is no longer modeling your business.",
    },
  ],
  relatedLinks: [
    { href: "/blog-field-service-software-vs-off-the-shelf", label: "When off-the-shelf breaks down" },
    { href: "/blog-field-service-software-cost", label: "What field service software costs" },
    { href: "/blog-how-to-know-youve-outgrown-spreadsheets", label: "Outgrowing spreadsheets" },
    { href: "/operations-software", label: "Custom operations software" },
  ],
  moneyPage: { href: "/field-service-software", label: "SEE FIELD SERVICE SOFTWARE" },
};

export default function Page() {
  return (
    <ArticlePage meta={META}>
      <p>
        Let me be clear up front. ServiceTitan is not bad software. For a certain
        size of company, running a certain kind of operation, it does exactly
        what it&rsquo;s supposed to do, and a lot of Utah shops run on it happily.
      </p>
      <p>
        But there&rsquo;s a conversation nobody in the software sales process is
        going to have with you, and it&rsquo;s the one worth having before you
        sign anything.
      </p>

      <h2>What it&rsquo;s actually built for</h2>
      <p>
        ServiceTitan is built for the average field service company. By average I
        don&rsquo;t mean mediocre — I mean the statistical middle. Standard job
        types, standard dispatch, standard reporting needs. If your operation
        looks like most operations, it fits well.
      </p>
      <p>
        The catch is that most owners don&rsquo;t think their operation is
        average, and a good share of them are right. You&rsquo;ve got a quoting
        process that took years to dial in. Your crews work in ways that
        don&rsquo;t map cleanly onto how the software defines a job. You&rsquo;ve
        built workarounds — spreadsheets, group texts, manual exports — just to
        get data into a shape you can use.
      </p>
      <p>That&rsquo;s not a you problem. It&rsquo;s a fit problem.</p>

      <h2>Where it starts breaking down</h2>
      <p>
        The warning sign isn&rsquo;t the software failing. It&rsquo;s your team
        starting to work around it.
      </p>
      <p>
        Every hour spent exporting to a spreadsheet because the report is close
        but not right. Every time a tech calls the office because the app
        can&rsquo;t represent how you dispatch. Every workaround you&rsquo;ve
        quietly accepted as just how things are.
      </p>
      <blockquote>
        That&rsquo;s the cost nobody puts in the brochure. Not the subscription
        fee — the operational drag. And you&rsquo;re paying both at once.
      </blockquote>

      <h2>What custom software actually means</h2>
      <p>
        Custom software has a reputation for being complicated, expensive and
        risky. Some of that is earned; there are genuinely bad ways to do it. But
        the core idea is simpler than the reputation suggests.
      </p>
      <p>
        Instead of buying software and adjusting your operation to fit it, you
        build software that fits the operation you already have. Your quoting
        process stays your quoting process. Your dispatch workflow stays yours.
        The reporting shows what you actually track, because it was built around
        what you actually track.
      </p>
      <p>
        No workarounds. No &ldquo;we just don&rsquo;t use that part.&rdquo; No
        calling support to ask whether there&rsquo;s a way to do the thing
        you&rsquo;ve been doing manually for three years. For Utah HVAC,
        electrical and plumbing shops that usually means{" "}
        <Link href="/field-service-software">
          field operations software shaped around how crews and the office really
          work
        </Link>
        , not a one-size template.
      </p>

      <h2>The real comparison</h2>
      <p>
        Past the feature checklist, the side-by-side looks like this. ServiceTitan
        is a subscription. It rises. Every seat you add costs more. Every feature
        they announce at their conference is baked into your renewal whether you
        asked for it or not.
      </p>
      <p>
        Custom is a one-time build. When it&rsquo;s done, you own it. Hire five
        techs and the software cost doesn&rsquo;t move. Want a new feature? You
        decide whether and when. No price hike in January because someone
        else&rsquo;s investors need a better number.
      </p>
      <p>
        The upfront cost is real and I won&rsquo;t pretend otherwise — builds
        start at $25,000. But over three to five years the math usually flips,
        especially once you stop paying the drag. I run the full arithmetic in{" "}
        <Link href="/blog-field-service-software-cost">
          how much field service software costs
        </Link>
        .
      </p>

      <h2>Who this is actually for</h2>
      <p>
        Not everyone. If you&rsquo;re a two-truck operation running standard
        residential HVAC and ServiceTitan fits cleanly, use ServiceTitan. It is a
        good product for the right company, and replacing it with a custom build
        would be an expensive way to end up in the same place.
      </p>
      <p>Custom makes sense when:</p>
      <ul>
        <li>Your edge cases have quietly become the norm.</li>
        <li>
          You run multiple crews with different workflows that no single platform
          handles well.
        </li>
        <li>
          You&rsquo;ve outgrown the software and can&rsquo;t find anything that
          fits better.
        </li>
        <li>
          Real hours go into manual data work every week because your tools
          don&rsquo;t talk to each other.
        </li>
      </ul>
      <p>
        If that sounds familiar, the subscription you&rsquo;re paying for
        isn&rsquo;t solving the problem. It&rsquo;s containing it.
      </p>

      <h2>Before you decide anything</h2>
      <p>
        The conversation I have with every owner before we discuss building
        anything is simple: tell me how your operation actually works. Not how
        the software says it should work. How it actually works, exceptions
        included.
      </p>
      <p>
        Most of the time that conversation alone surfaces things people
        haven&rsquo;t had language for — the drag they&rsquo;ve normalized, the
        workarounds that turned invisible, the hours nobody is officially
        counting. That&rsquo;s where the real cost lives, and it&rsquo;s where
        the right answer starts. Sometimes the right answer is to keep paying the
        subscription.
      </p>
    </ArticlePage>
  );
}
