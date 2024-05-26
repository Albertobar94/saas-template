import { z } from "zod";

export const StripeEnv = z
  .object({
    STRIPE_PUBLISHABLE_KEY: z.string(),
  })
  .parse({
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
