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
 * Generated through Satori with the vendored Bricolage Grotesque so the
 * letterforms match the wordmark exactly and the build never needs the
 * network.
 */
export default async function Icon() {
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
          // The M has no descender, so centring the line box leaves the ink
          // low; align-items:center plus a margin cannot fix it, because
          // flexbox centres the margin box. Corrected with flex-start and an
          // explicit paddingTop.
          //
          // lineHeight:1 is load-bearing. Satori defaults to 1.2, and
          // Bricolage's content box is 1.20em tall (ascent .93 + descent .27),
          // so at the default the glyph sits a full 0.27em low and no
          // NON-NEGATIVE padding can pull it back to centre. At lineHeight 1
          // the half-leading goes negative, the ink starts 77px down, and 28px
          // of padding lands it on 105/105. Measured from the rendered PNG,
          // not derived — re-measure if the face or the size changes.
          //
          // These numbers are fitted to Satori's raster output, NOT the 0.5
          // coefficient MdBlock uses; that one is fitted to the browser's
          // line-box rounding for the DOM lockup.
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 28,
          background: "#1442cf",
          color: "#f3f2f2",
          fontFamily: "Bricolage Grotesque",
          fontSize: 456,
          lineHeight: 1,
          // No letterSpacing, unlike the MD lockup: tracking is applied after
          // the final glyph too, so on one letter it only pads the text box
          // and drags the M off centre.
        }}
      >
        M
      </div>
    ),
    { ...size, fonts: [{ name: "Bricolage Grotesque", data: display, weight: 800, style: "normal" }] }
  );
}
