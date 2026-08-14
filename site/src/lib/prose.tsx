import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Contextual links inside body copy.
 *
 * Pages are data (`src/content/pages/*.ts`) and every body was typed as a
 * plain string, which made an in-prose link structurally impossible — so the
 * service pages had zero of them and the only internal links Google could see
 * were nav, footer and a sidebar list. That is the highest-value link surface
 * on the page and it was unusable.
 *
 * The syntax is deliberately the smallest thing that works: `[text](/path)`,
 * internal paths only. No markdown parser, no HTML in content files, no way
 * for a page to smuggle in styling that breaks the design system.
 */
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

const linkClass =
  "font-bold text-accent-700 underline decoration-2 underline-offset-[3px] hover:text-accent";

/** Body copy with `[text](/path)` rendered as real links. */
export function withLinks(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(LINK)) {
    const at = match.index ?? 0;
    if (at > cursor) parts.push(text.slice(cursor, at));
    parts.push(
      <Link key={`${at}-${match[2]}`} href={match[2]} className={linkClass}>
        {match[1]}
      </Link>
    );
    cursor = at + match[0].length;
  }

  if (cursor === 0) return text;
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

/**
 * The same copy as plain text. Anything machine-read — FAQ answers in
 * FAQPage schema, descriptions in metadata — must go through this, or the
 * raw `[text](/path)` ends up in the markup an answer engine quotes.
 */
export function stripLinks(text: string): string {
  return text.replace(LINK, "$1");
}
