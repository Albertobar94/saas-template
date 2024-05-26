import { TRPCError } from "@trpc/server";
import { type UserRole } from "@package/database/dto";
import { type Context } from "@package/trpc";
import { type ProcedureResolverOpts } from "@package/trpc/resolver";

type DecoratedFunction<TContext, Input, Output> = (
  opts: ProcedureResolverOpts<TContext, Input>,
) => Promise<Output>;

export function AllowedRoles<TContext extends Context, TInput, TOutput>(
  ...roles: UserRole[]
) {
  return (...args: unknown[]) => {
    const descriptor = args[2] as PropertyDescriptor;

    const originalMethod = descriptor.value as
      | DecoratedFunction<TContext, TInput, TOutput>
      | undefined;
    if (!originalMethod) {
      throw new Error("Decorator can only be applied to methods");
    }

    descriptor.value = async function DecoratorAllowRoles(
      opts: ProcedureResolverOpts<TContext, TInput>,
    ) {
      const user = opts.ctx.session?.user;

      for await (const role of roles) {
        const isAllowed = user?.role === role;
        if (isAllowed) {
          return originalMethod.apply(this, [opts]);
        }
      }

      // TODO: Create Custom App Error package
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to access this resource.",
      });
    };

    return descriptor;
  };
}
