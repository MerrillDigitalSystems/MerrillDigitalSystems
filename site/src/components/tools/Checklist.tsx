"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Btn } from "@/components/ui/Btn";
import { track } from "@/lib/analytics";

/**
 * The pre-2026 page fired `checklist_high_score` the moment the visitor
 * checked their sixth sign. That threshold is preserved exactly — it is the
 * boundary of the "your software is actively costing you" band below, and the
 * highest-intent signal on the site. It fires once per page view.
 */
const HIGH_SCORE = 6;

export type ChecklistItem = { id: string; title: string; body: string };

/** Square 2px box with a cobalt core — the same mark ScopeBuilder draws. */
function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="mt-[2px] flex h-[20px] w-[20px] shrink-0 items-center justify-center border-2 border-ink"
    >
      {checked && <span className="h-[10px] w-[10px] bg-accent" />}
    </span>
  );
}

const MESSAGES = [
  "Check any sign that applies to your operation.",
  "One sign. Worth an eye on, not a project.",
  "Two signs. Some friction building quietly.",
  "Three signs. You're spending more time compensating than you should be.",
  "Four signs. The workarounds are becoming the system.",
  "Five signs. This is costing real hours every week.",
  "Six signs. The software is limiting the business rather than running it.",
  "Seven signs. That's a bottleneck, not an annoyance.",
  "Eight signs. You're working around your tools more than with them.",
  "Nine signs. The setup is holding the business back.",
  "Ten for ten. Time for a different approach.",
];

export function Checklist({ items }: { items: ChecklistItem[] }) {
  const [checked, setChecked] = useState<Record<string, true>>({});
  const fired = useRef(false);

  const score = Object.keys(checked).length;
  const total = items.length;
  const pct = total ? (score / total) * 100 : 0;

  function toggle(id: string) {
    const next: Record<string, true> = { ...checked };
    if (next[id]) delete next[id];
    else next[id] = true;
    setChecked(next);

    const n = Object.keys(next).length;
    if (n >= HIGH_SCORE && !fired.current) {
      fired.current = true;
      track("checklist_high_score", {
        event_category: "Engagement",
        event_label: "Checklist Score 6+",
        value: n,
      });
    }
  }

  return (
    <div className="mt-[clamp(28px,4vw,56px)] grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[1.15fr_.85fr]">
      <ul className="flex flex-col border-t-2 border-t-ink">
        {items.map((item, i) => {
          const isChecked = Boolean(checked[item.id]);
          return (
            <li key={item.id} className="border-b-2 border-b-neutral-300">
              <label
                className={`flex cursor-pointer items-start gap-4 py-5 transition-colors ${
                  isChecked ? "bg-accent-100" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  className="sr-only"
                />
                <Checkbox checked={isChecked} />
                <span className="flex-1">
                  <span className="eyebrow block text-neutral-600">
                    SIGN {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block text-[15.5px] font-extrabold leading-[1.25] tracking-[-.02em]">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-[13.5px] leading-[1.55] text-neutral-800">
                    {item.body}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <aside className="min-[900px]:sticky min-[900px]:top-[96px] min-[900px]:self-start">
        <div className="border-2 border-ink bg-accent p-[clamp(18px,2.4vw,34px)] text-bg">
          <p className="eyebrow opacity-80">YOUR SCORE</p>
          <p
            className="mt-3 font-extrabold leading-none tracking-[-.035em]"
            style={{ fontSize: "clamp(40px, 6vw, 76px)" }}
          >
            {score} / {total}
          </p>

          <div className="mt-5 h-[8px] bg-bg/30" role="presentation">
            <div
              className="h-full bg-bg"
              style={{
                width: `${pct}%`,
                transition: "width 420ms cubic-bezier(.16,1,.3,1)",
              }}
            />
          </div>

          <p
            role="status"
            aria-live="polite"
            className="mt-5 min-h-[3.2em] text-[14.5px] leading-[1.55]"
          >
            {MESSAGES[score]}
          </p>

          {score >= 3 && (
            <div className="mt-6 border-t-2 border-t-bg/40 pt-6">
              <p className="text-[13.5px] leading-[1.55]">
                {score >= 7
                  ? `At ${score} signs there's a real cost your team absorbs every week. Worth thirty minutes to scope what it would take to remove it.`
                  : score >= 5
                    ? `At ${score} signs the friction is measurable. A thirty-minute call can scope the problem and give you an honest path.`
                    : "Enough friction to be worth a conversation. No pitch — I'll tell you if the answer is an off-the-shelf tool."}
              </p>
              <Btn href="#contact" inverted block className="mt-5">
                GET A FREE SCOPE &amp; ESTIMATE →
              </Btn>
              {score >= HIGH_SCORE && (
                <Link
                  href="/free-audit"
                  className="mt-4 block text-[13px] font-bold text-bg underline underline-offset-4"
                >
                  Your website is probably leaking leads too — get the free audit →
                </Link>
              )}
            </div>
          )}
        </div>

        <p className="mt-5 text-[10px] font-bold uppercase tracking-[.15em] text-neutral-600">
          NOTHING IS SENT ANYWHERE · NO EMAIL REQUIRED
        </p>
      </aside>
    </div>
  );
}
