/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  poweredByHeader: false,
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ["pi-network.github.io", "github.com", "vercel.app"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
