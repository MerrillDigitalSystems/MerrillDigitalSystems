import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS rounds the corners itself and never shows transparency, so the mark is
 * inset a little to survive the crop.
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
          // Same solved offset as app/icon.tsx: 180/2 - 0.42*70 = 61.
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 61,
          background: "#1442cf",
          color: "#f3f2f2",
          fontFamily: "Archivo",
          fontSize: 70,
          letterSpacing: "-0.06em",
          marginRight: -4,
        }}
      >
        MD
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }] }
  );
}
