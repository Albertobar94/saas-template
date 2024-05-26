import { DBEnv } from "@module/shared/server-env/db-env";
import { db } from "./neon";
import * as schema from "./schema";
import * as seeds from "./seeds";

async function main() {
  if (!DBEnv.DB_SEEDING) {
    // Logger
    throw new Error('You must set DB_SEEDING to "true" when running seeds');
  }

  // Logger
  for (const table of [schema.user, schema.account]) {
    await db.delete(table);
  }
  await seeds.user(db);
}

main().catch(() => {
  // logger
  process.exit(1);
});
