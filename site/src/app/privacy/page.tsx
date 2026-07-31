import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { LegalPage } from "@/components/templates/LegalPage";
import { SITE } from "@/lib/site";

const TITLE = "Privacy Policy | Merrill Digital Systems";
const DESCRIPTION =
  "What merrilldigitalsystems.com collects, which third parties see it, and how to get it deleted. Short, because there isn't much of it.";

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy",
});

export default function Page() {
  return (
    <LegalPage
      slug="/privacy"
      title={TITLE}
      description={DESCRIPTION}
      h1="Privacy policy"
      updated="2026-07-31"
    >
      <p>
        This covers <strong>merrilldigitalsystems.com</strong>, operated by{" "}
        {SITE.legalName} of {SITE.address.locality}, {SITE.address.region}. It is
        short because this site collects very little. Products have their own
        policies — see <Link href="/privacy-primis">Primis</Link> and{" "}
        <Link href="/privacy-bookkeeping-os">the bookkeeping platform</Link>.
      </p>

      <h2>What gets collected</h2>
      <p>
        <strong>When you submit the contact form:</strong> your name, business
        name, email address, and whatever you write in the message. If you used
        the scope builder first, the project type, add-ons, estimated range and
        timeline you configured are attached so the reply is useful. Also
        attached: the page you submitted from and, if you arrived from a link
        with campaign tags, those tags and the referring site.
      </p>
      <p>
        <strong>When you just read the site:</strong> standard analytics —
        pages viewed, approximate location at city level, device and browser,
        and how you arrived. This is aggregate; it is not used to identify you.
      </p>
      <p>
        <strong>What is never collected:</strong> payment details, passwords, or
        any special-category personal data. There is nothing to log into.
      </p>

      <h2>Who else sees it</h2>
      <ul>
        <li>
          <strong>Formspree</strong> — delivers contact form submissions to
          email. Submissions pass through and are stored on their servers.
        </li>
        <li>
          <strong>Google Analytics 4</strong> — usage analytics. Google sets
          cookies to distinguish returning visitors. IP addresses are truncated
          by Google before storage.
        </li>
        <li>
          <strong>Cal.com</strong> — only if you book a call. You give them your
          name, email and chosen time directly; the booking widget does not load
          until you click to open it.
        </li>
        <li>
          <strong>Cloudflare</strong> — sits in front of the site and handles
          security and delivery, so it processes request metadata including IP
          addresses.
        </li>
      </ul>
      <p>
        Nothing is sold, rented, or shared with advertisers. There are no
        advertising pixels on this site — no Meta pixel, no LinkedIn tag, no
        remarketing of any kind.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        Google Analytics sets cookies. The site also stores campaign tags and
        the page you first landed on in your browser&rsquo;s session storage, so
        that if you browse a few pages before getting in touch the enquiry still
        shows where it came from. Session storage is cleared when you close the
        tab and never leaves your browser except as part of a form you choose to
        submit.
      </p>
      <p>
        You can block all of it with your browser&rsquo;s privacy settings or an
        ad blocker. The site works fine without any of it.
      </p>

      <h2>How long it is kept</h2>
      <p>
        Enquiries are kept for as long as there is a live conversation or an
        active project, and for seven years afterwards where they form part of
        the business records for a paid project. Analytics data expires on
        Google&rsquo;s standard retention schedule.
      </p>

      <h2>Your rights</h2>
      <p>
        Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and ask for a
        copy of what is held about you, a correction, or deletion. You will get
        a reply within 30 days, and usually within one working day. No account
        or verification hoop — just ask.
      </p>

      <h2>Children</h2>
      <p>
        This is a business-to-business site and is not directed at anyone under
        16. No data is knowingly collected from children.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes materially, the date at the top changes with it.
        There is no version history worth keeping; if a change affects an active
        client, they get an email rather than a silent edit.
      </p>

      <h2>Contact</h2>
      <p>
        {SITE.legalName}
        <br />
        {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
        <br />
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <br />
        <a href={SITE.phoneHref}>{SITE.phone}</a>
      </p>
    </LegalPage>
  );
}
