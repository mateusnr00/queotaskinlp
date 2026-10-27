import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https:",
  "frame-src https://www.facebook.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // As artes vêm prontas e leves da CDN da Steam: não vale gastar o
    // otimizador da Vercel com elas.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
