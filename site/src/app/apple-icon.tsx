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
  const archivo = await readFile(
    join(process.cwd(), "src/app/_fonts/Archivo-ExtraBold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          // Same solved offset as app/icon.tsx, fitted to Satori's raster
          // output: 180/2 - 0.5345*160 = 4.48. Rounded up rather than to
          // nearest — at 4 the ink measured 34/36, at 5 it measures 35/35.
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 5,
          background: "#1442cf",
          color: "#f3f2f2",
          fontFamily: "Archivo",
          fontSize: 160,
        }}
      >
        M
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }] }
  );
}
