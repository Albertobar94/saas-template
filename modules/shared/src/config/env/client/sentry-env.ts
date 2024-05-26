import { z } from "zod";

export const SentryEnv = z
  .object({
    SENTRY_DSN: z.string().url(),
    SENTRY_ORG: z.string(),
    SENTRY_PROJECT: z.string(),
  })
  .parse({
    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SENTRY_ORG: process.env.NEXT_PUBLIC_SENTRY_ORG,
    SENTRY_PROJECT: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  });
