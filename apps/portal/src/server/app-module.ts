import { db } from "@package/database/neon";
import { logger } from "@package/logger";
import { Registry } from "@package/trpc/container";
import { ContainerTokens } from "@module/shared/constants";

@Registry([
  {
    token: ContainerTokens.Db,
    useValue: db,
  },
  {
    token: ContainerTokens.Logger,
    useFactory: (container) =>
      logger.getSubLogger(
        { name: "Container" },
        {
          requestId: container.resolve(ContainerTokens.RequestId),
          userId: container.resolve(ContainerTokens.UserId),
        },
      ),
  },
])
export class AppModule {}
