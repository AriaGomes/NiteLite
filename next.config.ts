import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    domains: ["www.google.com"],
  },
};

export default nextConfig;
