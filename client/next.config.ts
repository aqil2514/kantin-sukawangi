import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "cdn.sanity.io",
      },
      {
        hostname: "placehold.co",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
