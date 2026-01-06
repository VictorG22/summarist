import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    domains: ["firebasestorage.googleapis.com"], // whitelist Firebase Storage domain
  },
};

export default nextConfig;
