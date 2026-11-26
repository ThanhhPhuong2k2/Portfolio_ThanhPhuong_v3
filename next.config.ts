import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export, as the taste-skill build rule asks for Next.js (checked on `out/`).
  output: "export",
  // /project/x/ -> project/x/index.html: resolves on any static host, not only Vercel.
  trailingSlash: true,
  images: {
    // Static export has no image optimizer; resize through the source CDNs instead.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  experimental: {
    // Two root layouts ((vi) and (en)) need one app-wide 404.
    globalNotFound: true,
  },
};

export default nextConfig;
