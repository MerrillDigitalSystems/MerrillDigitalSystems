import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/meta";
import { LegalPage } from "@/components/templates/LegalPage";
import { SITE } from "@/lib/site";

const TITLE = "Privacy Policy: Primis | Merrill Digital Systems";
const DESCRIPTION =
  "How the Primis fitness app collects, uses and protects your data, and how to get it exported or deleted.";

export const metadata: Metadata = buildMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy-primis",
});

export default function Page() {
  return (
    <LegalPage
      slug="/privacy-primis"
      title={TITLE}
      description={DESCRIPTION}
      h1="Privacy policy: Primis"
      updated="2026-07-31"
    >
      <p>
        This describes how {SITE.legalName} collects, uses and protects
        information in the <strong>Primis</strong> mobile app. For the website
        itself, see the <Link href="/privacy">main privacy policy</Link>.
      </p>

      <h2>1. What is collected</h2>
      <ul>
        <li>
          <strong>Account information</strong> — name, email address and
          password when you create an account.
        </li>
        <li>
          <strong>Fitness data</strong> — workouts, goals, exercise history and
          progress metrics you enter or generate in the app.
        </li>
        <li>
          <strong>Device information</strong> — device type, operating system
          version and app version, for support and debugging.
        </li>
        <li>
          <strong>Usage data</strong> — anonymised analytics about how the app
          is used.
        </li>
      </ul>

      <h2>2. How it is used</h2>
      <ul>
        <li>To provide, maintain and improve the app</li>
        <li>To track and display your progress and goals</li>
        <li>
          To send updates, notifications or support messages — only with your
          consent
        </li>
        <li>To find and fix bugs and performance problems</li>
        <li>To meet legal obligations</li>
      </ul>

      <h2>3. Sharing</h2>
      <p>Your personal information is not sold. It is shared only:</p>
      <ul>
        <li>
          <strong>With service providers</strong> that help operate the app,
          such as hosting and analytics, under confidentiality obligations;
        </li>
        <li>
          <strong>Where the law requires it</strong>, in response to valid legal
          process;
        </li>
        <li>
          <strong>To protect safety</strong> — the rights, property or safety of
          users or the public.
        </li>
      </ul>

      <h2>4. Storage and security</h2>
      <p>
        Data is stored using industry-standard encryption and security
        practices, with reasonable measures against unauthorised access,
        alteration and destruction. No method of electronic storage is
        completely secure, and anyone who tells you otherwise is selling
        something.
      </p>

      <h2>5. Your rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>access the personal data held about you;</li>
        <li>have inaccurate data corrected;</li>
        <li>have your data deleted;</li>
        <li>withdraw consent for processing;</li>
        <li>export your data in a portable format.</li>
      </ul>
      <p>
        To exercise any of these, email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>6. Children</h2>
      <p>
        Primis is not intended for children under 13, and data is not knowingly
        collected from them. If we learn that we have collected data from a
        child under 13, we delete it.
      </p>

      <h2>7. Third-party services</h2>
      <p>
        The app may link to or integrate with third-party services. Their
        privacy practices are their own; please review their policies.
      </p>

      <h2>8. Changes</h2>
      <p>
        This policy may be updated. Significant changes are announced in the app
        or by email, and the date at the top changes with them.
      </p>

      <h2>9. Contact</h2>
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
