import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { ArticlePage, type ArticleMeta } from "@/components/templates/ArticlePage";

const TITLE = "WordPress vs Custom Code: Best for Your Utah Business?";
const DESCRIPTION =
  "An honest comparison of WordPress vs custom-coded websites for Utah service businesses — cost, speed, security, and ownership.";

const META: ArticleMeta = {
  slug: "/blog-wordpress-vs-custom-code",
  title: TITLE,
  description: DESCRIPTION,
  h1: "WordPress vs. custom code for a Utah business",
  lede: "WordPress runs a huge share of the web, which makes it the default. Default isn't the same as correct. Here's where it genuinely wins, and where it's overhead you pay for every month without noticing.",
  datePublished: "2026-03-16",
  readingTime: "6 min read",
  category: "Web Design",
  faq: [
    {
      q: "Is WordPress bad for small business websites?",
      a: "No. WordPress is the right tool when the CMS is actually being used — multiple writers publishing regularly, e-commerce with inventory and payments, or non-technical staff editing content weekly. It's the wrong tool when a five-to-fifteen page site gets updated twice a year and you're paying for a dashboard nobody opens.",
    },
    {
      q: "Why are custom-coded sites faster than WordPress?",
      a: "A WordPress page load runs PHP, queries a database, assembles HTML and then ships a theme framework plus scripts from every installed plugin. A static custom site skips the entire chain — the files already exist and the server just hands them over. That's the difference between a 3–4 second load and a sub-second one.",
    },
    {
      q: "What does WordPress actually cost per year to run?",
      a: "Managed hosting $240–$600, a premium theme or page builder license $50–$200, premium plugins for forms, SEO, security and backups $200–$500, and maintenance $500–$1,500 if you outsource updates. Call it $990–$2,900 a year. A static custom site is often under $100 a year in hosting.",
    },
    {
      q: "Can I still edit a custom-coded site myself?",
      a: "For most service businesses the honest answer is that you rarely will — the site gets built, you change a phone number once, and that's it. For the changes that do come up, a text edit takes minutes. If frequent editing is genuinely part of the workflow, a lightweight headless CMS gives you that without the full WordPress stack.",
    },
  ],
  relatedLinks: [
    { href: "/blog-website-cost-utah", label: "What a website costs in Utah" },
    { href: "/blog-why-service-business-websites-dont-convert", label: "Why websites don't convert" },
    { href: "/blog-utah-website-checklist", label: "The Utah website checklist" },
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
        &ldquo;Should I just use WordPress?&rdquo; I hear this at least once a
        week. It&rsquo;s a fair question. WordPress is everywhere. It&rsquo;s the
        default, and it&rsquo;s what most agencies sell because it&rsquo;s what
        they know.
      </p>
      <p>
        But default and optimal aren&rsquo;t the same word. WordPress is a great
        tool for some jobs and an expensive, slow, fragile choice for others. The
        deciding factor is narrower than most people expect.
      </p>

      <h2>What WordPress actually is</h2>
      <p>
        WordPress started in 2003 as blogging software and grew into a full
        content management system: a dashboard where you log in, create pages,
        publish posts and manage content without touching code.
      </p>
      <p>
        Its power comes from the ecosystem — tens of thousands of plugins for
        forms, SEO, e-commerce, booking, image optimization, caching, security,
        and thousands of themes controlling how it all looks. That ecosystem is
        genuinely useful. If you run a content operation with several writers
        publishing weekly, or a store that needs inventory and payment
        processing, WordPress with WooCommerce is a proven, battle-tested answer.
      </p>
      <p>
        The problem is that most Utah service businesses aren&rsquo;t running
        content operations or online stores. They&rsquo;re running plumbing
        companies, HVAC shops and landscaping crews, and their website needs are
        a different shape.
      </p>

      <h2>Where it costs service businesses</h2>
      <h3>Speed</h3>
      <p>
        The average WordPress site loads in three to four seconds. That
        doesn&rsquo;t sound catastrophic until you remember that a large share of
        mobile visitors abandon a page that takes longer than three.
      </p>
      <p>
        The reason is the chain: the browser requests the page, the server runs
        PHP, PHP queries MySQL, the database answers, PHP assembles the HTML, and
        then the response ships alongside a theme framework, a page builder&rsquo;s
        CSS and JavaScript, and scripts from a dozen or more plugins. You can
        mitigate all of it with caching, a CDN and managed hosting — you&rsquo;re
        just spending time and money optimizing around a problem that
        didn&rsquo;t need to exist. A static site skips the chain entirely.
      </p>

      <h3>Security</h3>
      <p>
        WordPress is the most-attacked CMS on the internet, and it&rsquo;s not
        because the core is badly written. It&rsquo;s because the plugin ecosystem
        is enormous and inconsistent. Every plugin is third-party code — some
        maintained by professional teams, some abandoned two years ago. When a
        vulnerability lands in a popular one, attackers can scan and exploit
        automatically before most owners know there&rsquo;s a problem.
      </p>
      <p>
        Keeping it safe means updating core, themes and every plugin, monitoring
        for vulnerabilities, and usually paying for a security service. A static
        site has no database to inject, no admin login to brute-force and no
        plugins to exploit.
      </p>

      <h3>Code you didn&rsquo;t ask for</h3>
      <p>
        Install a popular theme, add a page builder and a handful of plugins, then
        view source. You&rsquo;ll find thousands of lines of CSS and JavaScript
        the page never uses but the browser still downloads, parses and executes.
        Core Web Vitals measure exactly that, and it shows up in rankings.
      </p>

      <h3>Ongoing cost</h3>
      <p>
        WordPress is free. Running it is not. A typical small business site:
        managed hosting $240–$600 a year, theme or page builder license $50–$200,
        premium plugins $200–$500, maintenance $500–$1,500 if outsourced. Call it
        $990–$2,900 a year, every year. A static custom site hosted properly is
        often under $100 a year. (The fuller breakdown is in{" "}
        <Link href="/blog-website-cost-utah">
          what a website costs in Utah
        </Link>
        .)
      </p>

      <h3>You don&rsquo;t entirely own it</h3>
      <p>
        This one catches people. If your site is built in a page builder, your
        layouts and styling live in that builder&rsquo;s proprietary format inside
        a database. Move hosts, switch tools or rebuild, and you effectively start
        over. With custom code, your site is a folder of HTML, CSS and JavaScript.
        Any editor opens it, any server hosts it, any developer can pick it up.
      </p>

      <h2>When WordPress is the right call</h2>
      <p>
        I&rsquo;m not here to tell you WordPress is always wrong. It&rsquo;s the
        better tool when:
      </p>
      <ul>
        <li>
          <strong>You have a content team.</strong> Multiple writers, editorial
          workflow, draft management, user roles — the CMS features are worth
          their weight.
        </li>
        <li>
          <strong>You sell products.</strong> Inventory, payments, shipping
          calculations and customer accounts. WooCommerce is mature and well
          supported.
        </li>
        <li>
          <strong>Non-technical staff edit weekly.</strong> If the people running
          the site can&rsquo;t work with code and change things constantly, the
          visual editor is real value.
        </li>
      </ul>
      <p>
        Notice the thread: in all three, the CMS is actually being used. When it
        is, WordPress earns its complexity and you should hire someone who builds
        on it well.
      </p>

      <h2>When custom code wins</h2>
      <p>
        For most of the service businesses I work with through{" "}
        <Link href="/web-design-utah">Utah web design</Link>, the site is five to
        fifteen pages, gets updated a few times a year, and exists to do one job:
        generate leads. In that case the CMS features aren&rsquo;t just
        unnecessary — they&rsquo;re deadweight you pay for in speed, security and
        renewals.
      </p>
      <p>
        Custom is the better choice when the site is small, when speed and local
        SEO are the point, when you want the code to be yours with no proprietary
        format in the middle, and when you&rsquo;d rather spend nothing on
        maintenance. The numbers back it up: BK Toolbox shipped at 100 for SEO and
        99 for performance on Lighthouse, with no plugin stack to maintain
        afterward.
      </p>

      <h2>How to decide in one question</h2>
      <p>
        Will someone log into a dashboard and change content most weeks?
      </p>
      <p>
        If yes, use WordPress. It was built for that and it does it well. If no —
        and for most Utah service businesses the honest answer is no — you&rsquo;re
        paying for an editor nobody opens, plus the performance, security and
        maintenance bill that comes with it. It&rsquo;s not about which technology
        is better. It&rsquo;s about which one matches what you&rsquo;re actually
        doing.
      </p>
    </ArticlePage>
  );
}
