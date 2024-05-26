import { z } from "zod";

export const StripeEnv = z
  .object({
    STRIPE_SECRET_KEY: z.string(),
  })
  .parse({
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  });
