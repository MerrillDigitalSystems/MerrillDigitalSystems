import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/**
 * The tab and app icon: a single M on the cobalt block. The lockup's mark is
 * the slab-proportioned MD, but this slot is square and gets rendered at 16px
 * in tabs and search results, where two knocked-out letters turn to mush.
 *
 * app/favicon.ico and app/apple-icon.tsx carry the same M — Google will
 * consider any of the three, so they have to agree or the pick is a coin toss.
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
          // Archivo's caps have no descender, so centring the line box leaves
          // the ink high; align-items:center plus a margin cannot fix it,
          // because flexbox centres the margin box. Corrected with
          // flex-start + paddingTop = height/2 - 0.5345*fontSize.
          //
          // That coefficient is fitted to Satori's raster output, NOT the 0.42
          // MdBlock uses — that one was fitted to the browser's line-box
          // rounding for the DOM lockup and lands ~5% of the canvas low here.
          // 512/2 - 0.5345*456 = 12. Verified: ink margins 100/100 both axes.
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 12,
          background: "#1442cf",
          color: "#f3f2f2",
          fontFamily: "Archivo",
          fontSize: 456,
          // No letterSpacing, unlike the MD lockup: tracking is applied after
          // the final glyph too, so on one letter it only pads the text box
          // and drags the M off centre.
        }}
      >
        M
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }] }
  );
}
