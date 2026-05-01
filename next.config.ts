import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["192.168.86.246", "192.168.1.8"],
    images: {
          remotePatterns: [
            {
                      protocol: "https",
                      hostname: "images.unsplash.com",
            },
                ],
    },
    typescript: {
          ignoreBuildErrors: true,
    },
    eslint: {
          ignoreDuringBuilds: true,
    },
};

export default nextConfig;
