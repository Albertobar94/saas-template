import { AnalyticsEnv } from "./analytics";
import { AppEnv } from "./app-env";
import { SentryEnv } from "./sentry-env";

export const env = {
  ...AppEnv,
  ...SentryEnv,
  ...AnalyticsEnv,
};
