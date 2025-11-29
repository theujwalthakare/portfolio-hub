import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;