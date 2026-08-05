import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true" || process.env.npm_lifecycle_event === "deploy";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/forever-you" : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;


