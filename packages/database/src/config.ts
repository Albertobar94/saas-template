import type { Config } from "drizzle-kit";
import { DBEnv } from "@module/shared/server-env/db-env";

const connectionString = DBEnv.DIRECT_URL;

export const config = {
  schema: "./src/schema/index.ts",
  out: "./src/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
  verbose: true,
} satisfies Config;

export default config;
