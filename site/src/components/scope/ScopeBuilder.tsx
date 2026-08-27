"use client";

import { useScope } from "./ScopeContext";
import { SCOPE, SCOPE_ORDER, SCOPE_COPY, money } from "@/content/scope";
import { track, trackOnce } from "@/lib/analytics";

/** Square 2px box with a cobalt core — the same mark the checklist tool draws. */
function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="mt-[2px] flex h-[20px] w-[20px] shrink-0 items-center justify-center border-2 border-neutral-600"
    >
      {checked && <span className="h-[10px] w-[10px] bg-accent" />}
    </span>
  );
}

/**
 * Left: what you pick. Right: what it costs, pinned to the viewport while you
 * pick — the number is the whole point of the section, so it must never scroll
 * away mid-decision. The panel is only sticky where there is a second column
 * for it to be sticky in; below 900px it sits under the list, where a sticky
 * offset would pin it over the choices it is describing.
 */
export function ScopeBuilder() {
  const scope = useScope();
  const config = SCOPE[scope.sType];

  return (
    <div className="mt-[clamp(26px,3.5vw,44px)] grid items-start gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[1.1fr_.9fr]">
      <div>
        <div role="radiogroup" aria-label="Project type" className="flex flex-wrap gap-3">
          {SCOPE_ORDER.map((key) => {
            const selected = scope.sType === key;
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => {
                  scope.setType(key);
                  trackOnce("scope_builder_interact", { scope_type: key });
                }}
                className={`inline-flex min-h-[44px] items-center border-2 px-[18px] text-[11px] font-extrabold uppercase tracking-[.13em] leading-none transition-colors ${
                  selected
                    ? "border-ink bg-accent text-bg"
                    : "border-neutral-400 text-neutral-700 hover:border-accent hover:text-accent-700"
                }`}
              >
                {SCOPE[key].label}
              </button>
            );
          })}
        </div>

        <div className="mt-7 border border-neutral-300 bg-panel">
          <div className="flex items-center justify-between gap-3 border-b border-b-neutral-300 px-5">
            <span className="eyebrow text-neutral-700">
              {config.label} — ADD-ONS
            </span>
            {/* The padding is the hit area — a 12px "RESET" is otherwise the
                smallest control on the page. */}
            <button
              type="button"
              onClick={scope.reset}
              className="eyebrow -mr-2 inline-flex min-h-[44px] items-center px-2 text-accent-700 hover:text-accent-900"
            >
              RESET
            </button>
          </div>

          <ul>
            {config.mods.map((mod) => {
              const key = `${scope.sType}:${mod.id}`;
              const checked = Boolean(scope.mods[key]);
              return (
                <li key={mod.id} className="border-b border-b-neutral-300 last:border-b-0">
                  <label className="flex cursor-pointer items-start gap-4 px-5 py-[13px] transition-colors hover:bg-accent-100">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        scope.toggleMod(mod.id);
                        trackOnce("scope_builder_interact", { scope_type: scope.sType });
                      }}
                      className="sr-only"
                    />
                    <Checkbox checked={checked} />
                    <span className="flex-1 text-[14.5px] leading-[1.4] text-ink">
                      {mod.label}
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-[12.5px] font-bold text-accent-700">
                        +{money(mod.lo)}–{mod.hi.toLocaleString("en-US")}
                      </span>
                      <span className="mt-1 block text-[10px] font-bold uppercase tracking-[.12em] text-neutral-700">
                        +{mod.w} {mod.w === 1 ? "WK" : "WKS"}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <aside className="min-[900px]:sticky min-[900px]:top-[110px] min-[900px]:self-start">
        <div className="shadow-offset-accent border-2 border-ink bg-panel p-[clamp(20px,2.4vw,30px)]">
          <p className="eyebrow text-neutral-700">{SCOPE_COPY.rangeLabel}</p>
          <p
            className="mt-2 font-display font-extrabold leading-none tracking-[-.03em] text-accent-700"
            style={{ fontSize: "clamp(30px, 3.6vw, 52px)" }}
          >
            {scope.rangeLabel}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-t-neutral-300 pt-4">
            <div>
              <p className="eyebrow text-neutral-700">{SCOPE_COPY.timelineLabel}</p>
              <p className="mt-1 font-display text-[26px] font-extrabold tracking-[-.02em]">
                {scope.weeksLabel}
              </p>
            </div>
            <div>
              <p className="eyebrow text-neutral-700">{SCOPE_COPY.addonsLabel}</p>
              <p className="mt-1 font-display text-[26px] font-extrabold tracking-[-.02em]">
                {scope.selectedMods.length || SCOPE_COPY.addonsEmpty}
              </p>
            </div>
          </div>

          <ul className="mt-5 flex flex-col gap-2 border-t border-t-neutral-300 pt-4">
            {SCOPE_COPY.included.map((item) => (
              <li
                key={item}
                className="flex gap-[10px] text-[13.5px] leading-[1.4] text-neutral-800"
              >
                <span aria-hidden="true" className="shrink-0 text-accent-700">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={() => {
              const payload = scope.send();
              track("scope_send", {
                scope_type: payload.type,
                scope_addons: payload.addons.length,
                scope_range: payload.range,
              });
            }}
            className="mt-6 inline-flex w-full items-center justify-start gap-2 border-2 border-ink bg-accent px-[22px] py-[15px] text-[12px] font-extrabold uppercase tracking-[.11em] leading-none text-bg no-underline shadow-hard-cta transition-all duration-[180ms] hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-accent-600 hover:shadow-hard-cta-pressed"
          >
            {SCOPE_COPY.cta} <span aria-hidden="true">→</span>
          </a>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[.14em] text-neutral-700">
            {SCOPE_COPY.caption}
          </p>
        </div>
      </aside>
    </div>
  );
}

export { SCOPE_COPY };
