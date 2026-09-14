/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
];

const nextConfig = {
  reactStrictMode: true,
  // This project has its own lockfile; pin the workspace root so Next doesn't
  // walk up to a parent lockfile.
  turbopack: { root: import.meta.dirname },
  // Allow the dev server's internal /_next/* and HMR endpoints to be requested
  // from a phone/other device on the LAN (otherwise Next flags them as
  // cross-origin and client JS may fail to wire up). Add your machine's LAN IP
  // here; it can change with DHCP. Dev-only — ignored in production builds.
  allowedDevOrigins: ["10.157.16.130"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
