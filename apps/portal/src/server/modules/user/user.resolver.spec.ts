import { TRPCError } from "@trpc/server";
import { mockDeep } from "jest-mock-extended";
import { logger } from "@package/logger";
import type { DependencyContainer } from "@package/trpc/container";
import { Container } from "@package/trpc/container";
import { ContainerTokens } from "@module/shared/constants";
import { UserRepository } from "./user.repository";
import { UserResolver } from "./user.resolver";
import { UserResolverMock } from "./user.resolver.mock";

describe("[UserRepository] Methods Test Suite", () => {
  let container: DependencyContainer;
  const repository = mockDeep<UserRepository>();
  const testLogger = logger.getSubLogger({ type: "hidden" });

  beforeEach(() => {
    container = Container.createChildContainer();
    container.register(UserRepository, {
      useValue: repository,
    });
    container.register(ContainerTokens.Logger, {
      useValue: testLogger,
    });
    container.register(UserResolver, UserResolver);
  });

  afterEach(() => {
    container.reset();
  });

  it("should be resolved by the container", () => {
    // Dependencies
    expect(container.isRegistered(UserRepository)).toBeTruthy();
    expect(container.isRegistered(ContainerTokens.Logger)).toBeTruthy();

    // Resolver
    expect(container.isRegistered(UserResolver)).toBeTruthy();
    expect(container.resolve(UserResolver)).toBeTruthy();
  });

  it("should return user if session is active", async () => {
    const resolver = container.resolve(UserResolver);
    const resolverMock = new UserResolverMock().info({});

    repository.userInfo.mockResolvedValue(resolverMock.output);

    // Act
    const result = await resolver.info({
      ctx: resolverMock.ctx,
      input: resolverMock.input,
    });

    // Assert
    expect(result).toBeDefined();

    expect(result?.id).toBe(resolverMock.ctx.session.user.id);
    expect(result?.email).toBe(resolverMock.ctx.session.user.email);
    expect(result?.name).toBe(resolverMock.ctx.session.user.name);
    expect(result?.image).toBe(resolverMock.ctx.session.user.image);
    expect(result?.role).toBe(resolverMock.ctx.session.user.role);
  });

  it("should not allow the call having no session", async () => {
    const resolver = container.resolve(UserResolver);
    const resolverMock = new UserResolverMock().info({});

    repository.userInfo.mockResolvedValue(resolverMock.output);

    // Define Act
    const actor = () =>
      resolver.info({
        ctx: {
          ...resolverMock.ctx,
          // @ts-expect-error -- Testing purposes
          session: undefined,
        },
        input: resolverMock.input,
      });

    // Assert
    await expect(actor).rejects.toThrow(TRPCError);
    await expect(actor).rejects.toThrow("You are not allowed to access this resource.");
  });
});
