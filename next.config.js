/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  output: "standalone",
  env: {
    NEXT_PUBLIC_SERVER:
      process.env.NEXT_PUBLIC_SERVER || "https://www.justme.dev",
  },
};

module.exports = nextConfig;
