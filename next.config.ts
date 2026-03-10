import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the entire feratiye app under /feratiye on niche.com.mx.
  // Next.js automatically prepends this to all internal <Link> hrefs,
  // router.push() calls, and static asset URLs.
  basePath: "/feratiye",
  // Export as a fully static site (no Node server needed).
  output: "export",
};

export default nextConfig;
