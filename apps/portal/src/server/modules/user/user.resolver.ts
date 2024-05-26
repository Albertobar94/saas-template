import "reflect-metadata";
import { UserRole } from "@package/database/dto";
import type { Logger } from "@package/logger";
import { Inject, Resolver } from "@package/trpc/container";
import type { ProtectedContext } from "@package/trpc/context";
import { AbstractResolver, type ProcedureResolverOpts } from "@package/trpc/resolver";
import { isAdmin, AllowedRoles } from "@module/authz";
import type { UserInfoInput } from "@module/dto";
import { ContainerTokens } from "@module/shared/constants";
import { UserRepository } from "./user.repository";

@Resolver()
export class UserResolver extends AbstractResolver {
  constructor(
    @Inject(UserRepository) protected readonly userRepository: UserRepository,
    @Inject(ContainerTokens.Logger) protected readonly logger: Logger<unknown>,
  ) {
    super();

    this.logger = logger.getSubLogger({ name: "UserResolver" });
  }

  @AllowedRoles(UserRole.Admin, UserRole.User)
  async info({ ctx, input }: ProcedureResolverOpts<ProtectedContext, UserInfoInput>) {
    if (isAdmin(ctx)) {
      this.logger.info("Admin requested user info", { input });
      return this.userRepository.userInfo(input ? input : { id: ctx.session.user.id });
    }

    this.logger.info("User requested own info");
    return this.userRepository.userInfo({ id: ctx.session.user.id });
  }
}
