import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS rounds the corners itself and never shows transparency, so the mark is
 * inset a little to survive the crop.
 *
 * Single M, matching app/icon.tsx and app/favicon.ico — Google treats
 * rel=apple-touch-icon as a favicon candidate, so this can't disagree with the
 * others without making its favicon pick a coin toss.
 */
export default async function AppleIcon() {
  const display = await readFile(
    join(process.cwd(), "src/app/_fonts/BricolageGrotesque-ExtraBold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          // Same treatment as app/icon.tsx, scaled: lineHeight 1 so the glyph
          // is not pushed low by Satori's 1.2 default, then paddingTop fitted
          // by measuring the rendered PNG. See the long note there.
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 9,
          background: "#1442cf",
          color: "#f3f2f2",
          fontFamily: "Bricolage Grotesque",
          fontSize: 160,
          lineHeight: 1,
        }}
      >
        M
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage Grotesque", data: display, weight: 800, style: "normal" }] }
  );
}
