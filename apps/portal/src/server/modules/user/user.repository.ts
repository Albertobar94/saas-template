import { eq } from "@package/database";
import { type Db } from "@package/database/neon";
import { user } from "@package/database/schema";
import type { Logger } from "@package/logger";
import { Inject, Repository } from "@package/trpc/container";
import { type UserInfoInput } from "@module/dto";
import { ContainerTokens } from "@module/shared/constants";

// import { LogDuration } from "~/src/server/DEPRECATED decorators/log-duration.decorator";

@Repository()
export class UserRepository {
  constructor(
    @Inject(ContainerTokens.Db) readonly db: Db,
    @Inject(ContainerTokens.Logger) protected readonly logger: Logger<unknown>,
  ) {
    this.logger = logger.getSubLogger({ name: "UserRepository" });
  }

  // @LogDuration()
  userInfo(input: NonNullable<UserInfoInput>) {
    if (input.email) {
      return this.db.query.user.findFirst({
        where: eq(user.email, input.email),
      });
    }

    if (input.id) {
      return this.db.query.user.findFirst({
        where: eq(user.id, input.id),
      });
    }

    throw new Error(`UserRepository: Invalid input for userInfo ${this.userInfo.name}`);
  }
}
