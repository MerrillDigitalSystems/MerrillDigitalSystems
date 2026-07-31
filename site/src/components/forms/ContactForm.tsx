"use client";

import { useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import { captureAttribution, readAttribution } from "@/lib/attribution";
import { useScopePayload } from "@/components/scope/ScopeContext";
import { CONTACT } from "@/content/home";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "mt-2 w-full border-2 border-ink bg-bg px-[14px] py-[12px] text-[14px] text-ink " +
  "placeholder:text-neutral-500 focus-visible:border-accent";

const labelCls = "eyebrow text-neutral-700";

export function ContactForm({ formName = "contact" }: { formName?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const pathname = usePathname();
  // null on pages that have no scope builder — the form still works, it just
  // has nothing configured to attach.
  const scope = useScopePayload();

  useEffect(() => {
    captureAttribution();
  }, []);

  // A visitor who priced a build before writing is the highest-signal lead on
  // the site — carry what they configured into the message.
  const prefill = scope
    ? `I put together a scope on your site:\n` +
      `· Project type: ${scope.type}\n` +
      `· Estimated range: ${scope.range}\n` +
      `· Timeline: ${scope.weeks}\n` +
      `· Add-ons: ${scope.addons.length ? scope.addons.join(", ") : "none"}\n\n`
    : "";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people leave this empty. Fake a success so bots stop.
    if (data.get("_gotcha")) {
      setStatus("success");
      return;
    }

    for (const [key, value] of Object.entries(readAttribution())) {
      if (value) data.append(key, value);
    }
    if (scope) {
      data.append("scope_type", scope.type);
      data.append("scope_range", scope.range);
      data.append("scope_weeks", scope.weeks);
      data.append("scope_addons", scope.addons.join(", ") || "none");
    }

    setStatus("submitting");
    try {
      const res = await fetch(SITE.formspree, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree returned ${res.status}`);

      setStatus("success");
      form.reset();
      track("generate_lead", {
        event_category: "Contact",
        form_page: pathname,
        form_name: formName,
        scoped: scope ? "yes" : "no",
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-2 border-ink bg-bg p-[clamp(18px,2.4vw,34px)]">
        <p className="eyebrow text-accent-700">MESSAGE SENT</p>
        <h3 className="mt-4 text-[clamp(20px,2.2vw,26px)] font-extrabold leading-[1.12] tracking-[-.02em]">
          Got it. I&rsquo;ll reply within 24 hours.
        </h3>
        <p className="mt-4 text-[14px] leading-[1.6] text-neutral-800">
          It comes from me, not a sales rep. If it&rsquo;s urgent, call{" "}
          <a href={SITE.phoneHref} className="font-bold text-accent-700 underline underline-offset-4">
            {SITE.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border-2 border-ink bg-bg p-[clamp(18px,2.4vw,34px)]"
      noValidate
    >
      <p className="eyebrow text-accent-700">{CONTACT.formEyebrow}</p>
      <h3 className="mt-3 text-[clamp(18px,2vw,24px)] font-extrabold leading-[1.15] tracking-[-.02em]">
        {CONTACT.formHeading}
      </h3>

      <input type="hidden" name="_subject" value={`New lead — ${formName}`} />
      <input type="hidden" name="page" value={pathname} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />

      <div className="mt-6 grid gap-5 min-[600px]:grid-cols-2">
        <div>
          <label htmlFor="mdName" className={labelCls}>
            YOUR NAME
          </label>
          <input id="mdName" name="name" type="text" required placeholder="Jane Doe" className={field} />
        </div>
        <div>
          <label htmlFor="mdBiz" className={labelCls}>
            YOUR BUSINESS
          </label>
          <input id="mdBiz" name="company" type="text" placeholder="Acme Plumbing" className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="mdEmail" className={labelCls}>
          EMAIL
        </label>
        <input
          id="mdEmail"
          name="email"
          type="email"
          required
          placeholder="jane@acmeplumbing.com"
          className={field}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="mdNeed" className={labelCls}>
          WHAT ARE YOU TRYING TO FIX OR BUILD?
        </label>
        <textarea
          id="mdNeed"
          name="message"
          rows={prefill ? 8 : 4}
          required
          defaultValue={prefill}
          placeholder="We're running dispatch out of a group text and a spreadsheet…"
          className={field}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-start gap-2 border-2 border-ink bg-accent px-[22px] py-[15px] text-[12px] font-extrabold uppercase tracking-[.11em] leading-none text-bg shadow-hard-cta transition-all duration-[180ms] hover:bg-accent-600 hover:shadow-hard-cta-pressed hover:translate-x-[3px] hover:translate-y-[3px] disabled:pointer-events-none"
      >
        {status === "submitting" ? "SENDING…" : CONTACT.submit}
      </button>

      <p role="status" aria-live="polite" className="sr-only">
        {status === "submitting" ? "Sending your message" : ""}
      </p>

      {status === "error" && (
        <p className="mt-4 border-2 border-accent bg-accent-100 p-4 text-[13.5px] leading-[1.55] text-accent-700">
          That didn&rsquo;t go through. Email{" "}
          <a href={`mailto:${SITE.email}`} className="font-bold underline underline-offset-4">
            {SITE.email}
          </a>{" "}
          or call{" "}
          <a href={SITE.phoneHref} className="font-bold underline underline-offset-4">
            {SITE.phone}
          </a>{" "}
          and I&rsquo;ll pick it up from there.
        </p>
      )}

      <p className="mt-4 text-[10px] font-bold uppercase tracking-[.15em] text-neutral-600">
        {CONTACT.caption}
      </p>
    </form>
  );
}
