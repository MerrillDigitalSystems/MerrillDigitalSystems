import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/**
 * The tab and app icon: the MD block, squared off. The lockup's mark is
 * slab-proportioned, but a favicon slot is square — so here the initials fill
 * the square rather than sitting in a tall block.
 *
 * Generated through Satori with the vendored Archivo so the letterforms match
 * the wordmark exactly and the build never needs the network.
 */
export default async function Icon() {
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
          alignItems: "center",
          justifyContent: "center",
          background: "#1442cf",
          color: "#f3f2f2",
          fontFamily: "Archivo",
          fontSize: 232,
          letterSpacing: "-0.06em",
          // Optical centring: the cap-height box sits high in the em box.
          paddingBottom: 18,
        }}
      >
        MD
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }] }
  );
}
