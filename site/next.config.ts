import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is served by nginx on the Pi, no Node runtime in production.
  output: "export",
  trailingSlash: false,
  // No image optimization server exists under `output: export`; images are
  // pre-sized and pre-compressed by scripts/optimize-images.mjs instead.
  images: { unoptimized: true },
};

export default nextConfig;
