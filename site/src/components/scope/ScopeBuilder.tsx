"use client";

import { useScope } from "./ScopeContext";
import { SCOPE, SCOPE_ORDER, SCOPE_COPY, money } from "@/content/scope";
import { track, trackOnce } from "@/lib/analytics";

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

export function ScopeBuilder({ heading = SCOPE_COPY.heading }: { heading?: string }) {
  const scope = useScope();
  const config = SCOPE[scope.sType];

  return (
    <div className="mt-[clamp(28px,4vw,56px)] grid gap-[clamp(24px,4vw,56px)] min-[900px]:grid-cols-[1.15fr_.85fr]">
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
                className={`border-2 px-[18px] py-[13px] text-[11px] font-extrabold uppercase tracking-[.13em] leading-none transition-colors ${
                  selected
                    ? "border-accent bg-accent text-bg"
                    : "border-neutral-700 text-neutral-400 hover:border-accent-400 hover:text-bg"
                }`}
              >
                {SCOPE[key].label}
              </button>
            );
          })}
        </div>

        <ul className="mt-8 flex flex-col">
          {config.mods.map((mod) => {
            const key = `${scope.sType}:${mod.id}`;
            const checked = Boolean(scope.mods[key]);
            return (
              <li key={mod.id} className="border-t border-t-neutral-800 last:border-b last:border-b-neutral-800">
                <label className="flex cursor-pointer items-start gap-4 py-[14px]">
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
                  <span className="flex-1 text-[14px] leading-[1.5] text-bg">
                    {mod.label}
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-[13px] font-bold text-accent-400">
                      +{money(mod.lo)}–{mod.hi.toLocaleString("en-US")}
                    </span>
                    <span className="mt-1 block text-[10px] font-bold uppercase tracking-[.15em] text-neutral-500">
                      +{mod.w} {mod.w === 1 ? "WK" : "WKS"}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={scope.reset}
          className="mt-6 text-[10px] font-bold uppercase tracking-[.15em] text-neutral-500 underline underline-offset-4 hover:text-accent-400"
        >
          {SCOPE_COPY.reset}
        </button>
      </div>

      <aside className="min-[900px]:sticky min-[900px]:top-[96px] min-[900px]:self-start">
        <div className="border-2 border-bg bg-accent p-[clamp(18px,2.4vw,34px)] text-bg">
          <p className="eyebrow opacity-80">{SCOPE_COPY.rangeLabel}</p>
          <p
            className="mt-3 font-extrabold leading-none tracking-[-.035em]"
            style={{ fontSize: "clamp(26px, 3.4vw, 46px)" }}
          >
            {scope.rangeLabel}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-[2px] bg-bg/40">
            <div className="bg-accent pr-3 pt-4">
              <p className="eyebrow opacity-80">{SCOPE_COPY.timelineLabel}</p>
              <p className="mt-2 text-[17px] font-extrabold tracking-[-.02em]">
                {scope.weeksLabel}
              </p>
            </div>
            <div className="bg-accent pl-3 pt-4">
              <p className="eyebrow opacity-80">{SCOPE_COPY.addonsLabel}</p>
              <p className="mt-2 text-[17px] font-extrabold tracking-[-.02em]">
                {scope.selectedMods.length || SCOPE_COPY.addonsEmpty}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t-2 border-t-bg/40 pt-5">
            <p className="eyebrow opacity-80">{SCOPE_COPY.includedLabel}</p>
            <ul className="mt-4 flex flex-col gap-[10px]">
              {SCOPE_COPY.included.map((item) => (
                <li key={item} className="flex gap-3 text-[13.5px] leading-[1.5]">
                  <span aria-hidden="true">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

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
            className="mt-6 inline-flex w-full items-center justify-start gap-2 border-2 border-bg bg-bg px-[22px] py-[15px] text-[12px] font-extrabold uppercase tracking-[.11em] leading-none text-ink no-underline transition-colors hover:bg-accent-100 hover:text-accent-700"
          >
            {SCOPE_COPY.cta} <span aria-hidden="true">→</span>
          </a>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[.15em] opacity-80">
            {SCOPE_COPY.caption}
          </p>
        </div>
      </aside>
    </div>
  );
}

export { SCOPE_COPY };
