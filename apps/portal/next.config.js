const { withSentryConfig } = require("@sentry/nextjs");

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
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

/** @type {import('@sentry/cli').SentryCliOptions} */
const sentrySettings = {
  // We don't want Sentry to emit logs
  silent: true,
  // Define the Sentry Organisation
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  // Define the Sentry Project on our Sentry Organisation
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
};

/** @type {import('@sentry/nextjs/types/config/types').UserSentryOptions} */
const sentryConfig = {
  // Upload Next.js or third-party code in addition to our code
  widenClientFileUpload: true,
  // Attempt to circumvent ad blockers
  tunnelRoute: "/monitoring",
  // Prevent source map comments in built files
  hideSourceMaps: false,
  // Tree shake Sentry stuff from the bundle
  disableLogger: true,
  // Applies same WebPack Transpilation as Next.js
  transpileClientSDK: true,
};

// Next.js Configuration with `sentry` enabled
const nextWithSentry = withSentryConfig(
  // Default Next.js Configuration
  nextjsConfig,
  // Default Sentry Settings
  sentrySettings,
  // Default Sentry Extension Configuration
  sentryConfig,
);

module.exports = nextWithSentry;
