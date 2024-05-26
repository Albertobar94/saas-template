import { env as CommonEnv } from "../common";
import { AnalyticsEnv } from "./analytics";
import { SentryEnv } from "./sentry-env";
import { StripeEnv } from "./stripe";

export const env = {
  ...CommonEnv,
  ...SentryEnv,
  ...AnalyticsEnv,
  ...StripeEnv,
};
