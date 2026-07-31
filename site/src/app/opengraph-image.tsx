import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const alt = "Merrill Digital Systems — custom software and websites in Utah";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Direction 14, the ruled wordmark, rendered as the share card: ink on the
 * light ground, the cobalt rule doing the work, the legacy tagline kept.
 * The font is vendored so the Docker build never needs the network.
 */
export default async function OpengraphImage() {
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
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f2f2",
          padding: 84,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* The slab-proportioned MD block, same mark as the site header. */}
          <div
            style={{
              width: 58,
              height: 88,
              background: "#1442cf",
              color: "#f3f2f2",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 11,
              fontSize: 32,
              letterSpacing: "-0.06em",
            }}
          >
            MD
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.3em",
              color: "#605d5d",
            }}
          >
            WEST JORDAN · UTAH
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              letterSpacing: "-0.045em",
              color: "#201e1d",
              lineHeight: 1,
            }}
          >
            MERRILL DIGITAL
          </div>
          <div style={{ display: "flex", width: 640, height: 12, background: "#1442cf", marginTop: 18 }} />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: "0.34em",
              color: "#605d5d",
              marginTop: 18,
            }}
          >
            SYSTEMS · UTAH
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "4px solid #201e1d",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#201e1d", letterSpacing: "-0.02em" }}>
            {SITE.tagline.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#0b2a86", letterSpacing: "0.12em" }}>
            CUSTOM SOFTWARE · WEBSITES · YOU OWN THE CODE
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }],
    }
  );
}
