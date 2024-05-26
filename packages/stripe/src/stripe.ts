import Stripe from "stripe";
import { env } from "@module/shared/server-env";

export class StripeService {
  constructor(private readonly stripe: Stripe) {
    this.stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2024-04-10" });
  }
}
