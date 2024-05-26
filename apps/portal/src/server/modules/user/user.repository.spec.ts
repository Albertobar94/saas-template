import { faker } from "@faker-js/faker";
import { mockDeep } from "jest-mock-extended";
import { type Db } from "@package/database/neon";
import { logger } from "@package/logger";
import { Container, type DependencyContainer } from "@package/trpc/container";
import { ContainerTokens } from "@module/shared/constants";
import { UserRepository } from "./user.repository";
import { UserRepositoryMock } from "./user.repository.mock";

describe("[UserRepository] Methods Test Suite", () => {
  let container: DependencyContainer;

  const drizzle = mockDeep<Db>();
  const testLogger = logger.getSubLogger({ type: "hidden" });

  beforeEach(() => {
    container = Container.createChildContainer();
    container.register(ContainerTokens.Db, {
      useValue: drizzle,
    });
    container.register(ContainerTokens.Logger, {
      useValue: testLogger,
    });
    container.register(UserRepository, UserRepository);
  });

  afterEach(() => {
    container.reset();
  });

  it("should be resolved by the container", () => {
    // Dependencies
    expect(container.isRegistered(ContainerTokens.Db)).toBeTruthy();
    expect(container.isRegistered(ContainerTokens.Logger)).toBeTruthy();

    // Repository
    expect(container.isRegistered(UserRepository)).toBeTruthy();
    expect(container.resolve(UserRepository)).toBeTruthy();
  });

  it("should return user info by email", async () => {
    const repository = container.resolve(UserRepository);
    const userInfoMock = new UserRepositoryMock().userInfo({
      email: faker.internet.email(),
    });

    jest.spyOn(drizzle.query.user, "findFirst").mockResolvedValue(userInfoMock.output);

    // Act
    const result = await repository.userInfo(userInfoMock.input);

    // Assert
    expect(result).toBeDefined();
    expect(result?.email).toBe(userInfoMock.input.email);
    expect(drizzle.query.user.findFirst).toHaveBeenCalledWith(
      userInfoMock.drizzleInput.email,
    );
  });

  it("should return user info by id", async () => {
    const repository = container.resolve(UserRepository);
    const userInfoMock = new UserRepositoryMock().userInfo({
      id: faker.string.nanoid(),
    });

    jest.spyOn(drizzle.query.user, "findFirst").mockResolvedValue(userInfoMock.output);

    // Act
    const result = await repository.userInfo(userInfoMock.input);

    // Assert
    expect(result).toBeDefined();
    expect(result?.id).toBe(userInfoMock.input.id);
    expect(drizzle.query.user.findFirst).toHaveBeenCalledWith(
      userInfoMock.drizzleInput.id,
    );
  });
});
