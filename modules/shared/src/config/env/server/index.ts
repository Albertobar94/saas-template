import { env as CommonEnv } from "../common";
import { AuthEnv } from "./auth-env";
import { DBEnv } from "./db-env";
import { SentryEnv } from "./sentry-env";
import { StripeEnv } from "./stripe";

export const env = {
  ...CommonEnv,
  ...AuthEnv,
  ...DBEnv,
  ...SentryEnv,
  ...StripeEnv,
};
