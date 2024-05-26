"use server";

import { eq } from "@package/database";
import { db } from "@package/database/neon";
import { user } from "@package/database/schema";

export const getUserInfo = async ({ email }: { email: string }) => {
  return db.query.user.findFirst({
    where: eq(user.email, email),
  });
};
