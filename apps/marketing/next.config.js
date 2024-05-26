/** @type {import('next').NextConfig} */
const nextjsConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@module/ui",
    "@module/shared",
    "@package/database",
    "@package/auth",
    "@package/trpc",
    "@package/logger",
    "@package/analytics",
    "@package/stripe",
  ],
  images: {
    remotePatterns: [
      {
        hostname: "tailwindui.com",
      },
    ],
  },
};

module.exports = nextjsConfig;
