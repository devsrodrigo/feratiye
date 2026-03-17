import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Next resolves this folder as the workspace root when multiple lockfiles exist.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;