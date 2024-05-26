import { z } from "zod";

export const SentryEnv = z
  .object({
    SENTRY_AUTH_TOKEN: z.string(),
  })
  .parse({
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
  });
