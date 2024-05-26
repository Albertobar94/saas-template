import type * as Sentry from "@sentry/nextjs";
import { env } from "@module/shared/client-env";
import { AppEnvironments } from "@module/shared/constants";
import packageJson from "~/package.json";

export const sentryServer: Sentry.NodeOptions = {
  dsn: env.SENTRY_DSN, // Server DSN in server env ?
  enabled:
    env.APP_ENV === AppEnvironments.Development ||
    env.APP_ENV === AppEnvironments.Staging ||
    env.APP_ENV === AppEnvironments.Production,
  environment: env.APP_ENV,
  release: `@portal-${env.APP_ENV}-${packageJson.version}`,
  initialScope: {
    tags: {
      service: `@portal-${env.APP_ENV}`,
    },
  },

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.3,
};
