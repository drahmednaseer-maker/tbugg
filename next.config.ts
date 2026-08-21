import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.86.246", "192.168.1.8"],

  poweredByHeader: false,
  compress: true,

  images: {
    // AVIF first, WebP as fallback — roughly 50-70% smaller than the source
    // JPEGs at visually identical quality.
    formats: ["image/avif", "image/webp"],
    // Trimmed from the 8+8 defaults. Every extra entry is ~90 bytes of srcset
    // repeated across ~88 images, and the page was shipping 66 KB of srcset
    // strings. These cover the widths this layout actually renders at.
    deviceSizes: [640, 828, 1080, 1920, 2560],
    imageSizes: [48, 96, 192, 384],
    minimumCacheTTL: ONE_YEAR,
    // Next 15 rejects any `quality` value not listed here.
    qualities: [50, 55, 60, 65, 70, 75, 80],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },

  async headers() {
    return [
      {
        // Content photos only ever change by being replaced with a new
        // filename, so they can be cached indefinitely.
        source: "/destinations/:path*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` }],
      },
      {
        source: "/:file*.(jpg|jpeg|png|svg|webp|avif|ico|woff|woff2)",
        headers: [{ key: "Cache-Control", value: `public, max-age=${ONE_YEAR}, immutable` }],
      },
    ];
  },

  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
