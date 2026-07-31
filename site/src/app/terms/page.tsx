import type { Metadata } from "next";
import { buildMeta } from "@/lib/meta";
import { LegalPage } from "@/components/templates/LegalPage";
import { SITE } from "@/lib/site";

const TITLE = "Terms of Service | Merrill Digital Systems";
const DESCRIPTION =
  "The terms governing work with Merrill Digital Systems LLC — scope, ownership, payment, warranty and liability.";

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms",
});

export default function Page() {
  return (
    <LegalPage
      slug="/terms"
      title={TITLE}
      description={DESCRIPTION}
      h1="Terms of service"
      updated="2026-07-31"
    >
      <p>
        These terms govern use of this website and the services provided by{" "}
        {SITE.legalName} (&ldquo;MDS&rdquo;). Engaging MDS or using this site
        means you accept them.
      </p>
      <p>
        They are the default. Every project also has its own signed agreement,
        and <strong>where the two disagree, the project agreement wins.</strong>
      </p>

      <h2>1. Services</h2>
      <p>
        MDS builds custom software, operations platforms, mobile and web
        applications, and websites. The scope, timeline, deliverables and price
        of any particular project are defined in a separate statement of work
        agreed before the work starts — including what is deliberately excluded
        from a first version.
      </p>

      <h2>2. Engagement</h2>
      <p>
        Project work is governed by a master services agreement and/or a
        statement of work signed by both parties. These terms supplement those
        documents; they do not replace them.
      </p>

      <h2>3. Ownership of what gets built</h2>
      <p>Unless a project agreement says otherwise:</p>
      <ul>
        <li>
          Everything built specifically for you — code, repositories, domains
          and accounts — is assigned to you on final payment. There is no
          licence to renew and no subscription required to keep using it.
        </li>
        <li>
          MDS keeps ownership of pre-existing tools, frameworks and libraries it
          brought to the project. These speed delivery up; they are not the
          thing you are buying.
        </li>
        <li>
          MDS may reuse general knowledge, techniques and non-client-specific
          patterns learned during the work.
        </li>
      </ul>

      <h2>4. Payment</h2>
      <p>
        Terms are set in the applicable statement of work. Typically 50% to
        start and the remainder at launch, or split across milestones on larger
        builds. Absent other agreement, invoices are due within 30 days.
      </p>

      <h2>5. Confidentiality</h2>
      <p>
        Both parties will treat confidential information shared during an
        engagement with reasonable care and will not disclose it to third
        parties without written consent, except where the law requires it.
      </p>

      <h2>6. Bug warranty</h2>
      <p>
        Every project ships with a written bug warranty: <strong>90 days</strong>{" "}
        on websites and <strong>up to 150 days</strong> on custom software,
        measured from launch. Within that window, defects in what MDS built are
        fixed at no charge. The warranty covers defects — it does not cover new
        features, changes of scope, or breakage caused by third-party services
        or by changes someone else makes to the system.
      </p>

      <h2>7. Warranties and disclaimers</h2>
      <p>
        MDS warrants that services will be performed in a professional and
        workmanlike manner. Beyond that warranty and the bug warranty above,
        services are provided &ldquo;as is,&rdquo; and MDS disclaims all other
        warranties, express or implied, including implied warranties of
        merchantability and fitness for a particular purpose.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the maximum extent the law allows, MDS&rsquo;s total liability for
        any claim arising from its services will not exceed the total fees paid
        for the project that gave rise to the claim. MDS is not liable for
        indirect, incidental, consequential or punitive damages.
      </p>

      <h2>9. Termination</h2>
      <p>
        Either party may end an engagement as set out in the project agreement.
        Absent specific terms, either party may terminate on 30 days&rsquo;
        written notice, and the client pays for work completed up to that date.
        Work already paid for transfers to the client on termination.
      </p>

      <h2>10. Using this website</h2>
      <p>You are welcome to read it. Please do not:</p>
      <ul>
        <li>interfere with the site&rsquo;s operation;</li>
        <li>scrape it with automated tools;</li>
        <li>misrepresent who you are when getting in touch.</li>
      </ul>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Utah, without
        regard to conflict-of-law principles. Disputes are resolved in the
        courts of Utah.
      </p>

      <h2>12. Changes</h2>
      <p>
        These terms may be updated. Material changes are posted here and the
        date at the top changes with them. Active clients are told directly
        rather than left to notice a silent edit.
      </p>

      <h2>13. Contact</h2>
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
