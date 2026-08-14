import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is served by nginx on the Pi, no Node runtime in production.
  output: "export",
  trailingSlash: false,
  // No image optimization server exists under `output: export`; originals live
  // in assets/ and are pre-sized into public/img/ by scripts/optimize-images.mjs
  // (`npm run images`). Whatever is in public/ is byte-for-byte what ships.
  images: { unoptimized: true },
};

export default nextConfig;
