/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export", // ใช้สำหรับ static build
  images: {
    unoptimized: true // ปิด image optimization เพื่อรองรับ static export
  }
};

module.exports = nextConfig;
