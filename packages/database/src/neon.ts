import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@module/shared/server-env";
import * as schema from "./schema";

export const connection = neon(env.DATABASE_URL);

export const db = drizzle(connection, {
  schema,
  // TODO: Add logger
  logger: true,
});

export type Db = typeof db;
