"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { SCOPE, money, type ScopeType } from "@/content/scope";

export type ScopePayload = {
  type: string;
  addons: string[];
  range: string;
  weeks: string;
};

type ScopeState = {
  sType: ScopeType;
  setType: (t: ScopeType) => void;
  /** Keyed `type:modId` so selections never leak between project types. */
  mods: Record<string, true>;
  toggleMod: (id: string) => void;
  reset: () => void;
  lo: number;
  hi: number;
  w1: number;
  w2: number;
  rangeLabel: string;
  weeksLabel: string;
  selectedMods: { id: string; label: string }[];
  /** Set when the visitor sends a scope to the contact form. */
  sent: ScopePayload | null;
  send: () => ScopePayload;
};

const Ctx = createContext<ScopeState | null>(null);

export function ScopeProvider({ children }: { children: ReactNode }) {
  const [sType, setSType] = useState<ScopeType>("ops");
  const [mods, setMods] = useState<Record<string, true>>({});
  const [sent, setSent] = useState<ScopePayload | null>(null);

  const value = useMemo<ScopeState>(() => {
    const config = SCOPE[sType];
    const selected = config.mods.filter((m) => mods[`${sType}:${m.id}`]);

    const lo = config.lo + selected.reduce((sum, m) => sum + m.lo, 0);
    const hi = config.hi + selected.reduce((sum, m) => sum + m.hi, 0);
    const added = selected.reduce((sum, m) => sum + m.w, 0);
    const w1 = config.w1 + added;
    const w2 = config.w2 + added;

    const rangeLabel = `${money(lo)} – ${money(hi)}`;
    const weeksLabel = `${w1}–${w2} weeks`;

    return {
      sType,
      setType: (t) => setSType(t),
      mods,
      toggleMod: (id) =>
        setMods((prev) => {
          const key = `${sType}:${id}`;
          if (prev[key]) {
            const next = { ...prev };
            delete next[key];
            return next;
          }
          return { ...prev, [key]: true };
        }),
      reset: () =>
        setMods((prev) => {
          const next: Record<string, true> = {};
          for (const key of Object.keys(prev)) {
            if (!key.startsWith(`${sType}:`)) next[key] = true;
          }
          return next;
        }),
      lo,
      hi,
      w1,
      w2,
      rangeLabel,
      weeksLabel,
      selectedMods: selected.map((m) => ({ id: m.id, label: m.label })),
      sent,
      send: () => {
        const payload: ScopePayload = {
          type: config.label,
          addons: selected.map((m) => m.label),
          range: rangeLabel,
          weeks: weeksLabel,
        };
        setSent(payload);
        return payload;
      },
    };
  }, [sType, mods, sent]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** For the scope builder itself, which is meaningless without the provider. */
export function useScope() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useScope must be used inside ScopeProvider");
  return ctx;
}

/**
 * For the contact form, which appears on every page — including plenty that
 * have no scope builder on them. A missing provider just means there is no
 * configured scope to attach, not an error.
 */
export function useScopePayload(): ScopePayload | null {
  return useContext(Ctx)?.sent ?? null;
}
