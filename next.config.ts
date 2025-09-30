import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  // Configure serverActions for handling large requests
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
  }
};

export default nextConfig;
