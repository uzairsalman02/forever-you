import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = "";
if (isGithubActions) {
  repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "forever-you";
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo ? `/${repo}` : "",
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

