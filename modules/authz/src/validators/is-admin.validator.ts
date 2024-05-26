import { UserRole } from "@package/database/dto";
import type { ProcedureResolverOpts } from "@package/trpc/resolver";

export function isAdmin(ctx: ProcedureResolverOpts["ctx"]) {
  return ctx.session?.user.role === UserRole.Admin;
}
