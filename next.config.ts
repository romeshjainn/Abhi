import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote photos are resized by the Unsplash CDN (see src/lib/image-loader.ts),
    // so the site needs no image server and can be hosted as static files.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
