import { migrate } from "drizzle-orm/neon-http/migrator";
import { DBEnv } from "@module/shared/server-env/db-env";
import { config } from "./config";
import { db } from "./neon";

if (!DBEnv.DB_MIGRATING) {
  // logger
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

async function main() {
  // logger
  return migrate(db, { migrationsFolder: config.out });
}

main().catch(() => {
  // logger
  process.exit(1);
});
