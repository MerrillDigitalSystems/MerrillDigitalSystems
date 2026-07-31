import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { LegalPage } from "@/components/templates/LegalPage";
import { SITE } from "@/lib/site";

const TITLE = "Privacy Policy: Internal Operations OS | Merrill Digital";
const DESCRIPTION =
  "How data is collected, used and protected inside the Internal Operations OS platform, and who owns it.";

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy-bookkeeping-os",
});

export default function Page() {
  return (
    <LegalPage
      slug="/privacy-bookkeeping-os"
      title={TITLE}
      description={DESCRIPTION}
      h1="Privacy policy: Internal Operations OS"
      updated="2026-07-31"
    >
      <p>
        This describes how information is handled inside the{" "}
        <strong>Internal Operations OS</strong> platform, built by{" "}
        {SITE.legalName} for internal business use. For the website itself, see
        the <Link href="/privacy">main privacy policy</Link>.
      </p>

      <h2>1. Scope</h2>
      <p>
        The platform is an internal operations hub for authorised employees and
        team members of the deploying organisation. It is not a consumer
        application, and access is restricted to authenticated users with
        assigned roles.
      </p>

      <h2>2. What is collected</h2>
      <ul>
        <li>
          <strong>User account data</strong> — name, email address, role and
          authentication credentials, for users provisioned by the organisation.
        </li>
        <li>
          <strong>Operational data</strong> — job records, task assignments,
          workflow data, reports and notes entered by users in normal use.
        </li>
        <li>
          <strong>System logs</strong> — activity logs, login timestamps and
          audit trails, kept for security and compliance.
        </li>
        <li>
          <strong>Device and access data</strong> — browser type, IP address and
          device information, collected during authentication and session
          management.
        </li>
      </ul>

      <h2>3. How it is used</h2>
      <ul>
        <li>
          To run the platform&rsquo;s core functions — job tracking, task
          management, reporting and workflows
        </li>
        <li>To manage accounts and role-based access</li>
        <li>To generate business reports and operational analytics</li>
        <li>To maintain audit logs for security and compliance</li>
        <li>To find and resolve technical problems, and improve performance</li>
      </ul>

      <h2>4. Who owns the data</h2>
      <p>
        <strong>
          All business data entered into the platform belongs to the deploying
          organisation.
        </strong>{" "}
        {SITE.legalName} is the technology provider and claims no ownership of
        client business data. Handling is governed by the agreement between MDS
        and the organisation.
      </p>

      <h2>5. Sharing</h2>
      <p>Business data is never sold. It is shared only:</p>
      <ul>
        <li>
          <strong>With integrations the organisation configured</strong> — for
          example QuickBooks or a payroll provider — and only as far as those
          integrations need in order to work;
        </li>
        <li>
          <strong>With infrastructure providers</strong> that host and process
          data under confidentiality and security obligations;
        </li>
        <li>
          <strong>Where the law requires it</strong>, in response to valid legal
          process or to protect safety and rights.
        </li>
      </ul>

      <h2>6. Security</h2>
      <ul>
        <li>Encryption of data in transit and at rest</li>
        <li>Role-based access controls</li>
        <li>Audit logging of access and changes</li>
        <li>Regular security review</li>
      </ul>
      <p>
        These are strong measures, not a guarantee — no system is completely
        immune to security threats.
      </p>

      <h2>7. Retention</h2>
      <p>
        Data is retained for as long as the organisation maintains an active
        deployment. On termination it is handled per the service agreement,
        including export and deletion options.
      </p>

      <h2>8. User rights</h2>
      <p>
        If you use the platform, contact your own organisation&rsquo;s
        administrator about access, correction or deletion — they control user
        provisioning and data management. Questions for the technology provider
        go to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>9. Changes</h2>
      <p>
        This policy may be updated. Material changes are communicated to the
        deploying organisation, and the date at the top changes with them.
      </p>

      <h2>10. Contact</h2>
      <p>
        {SITE.legalName}
        <br />
        {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
        <br />
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalPage>
  );
}
