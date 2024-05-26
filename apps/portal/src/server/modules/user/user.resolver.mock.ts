import { faker } from "@faker-js/faker";
import { UserRole, type User } from "@package/database/dto";
import { Container } from "@package/trpc/container";
import type { UserResolver } from "./user.resolver";

export const createContextMock = () => ({
  session: {
    user: {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      name: faker.internet.userName(),
      role: UserRole.User,
    },
    expires: faker.date.recent().toISOString(),
  },
  container: Container.createChildContainer(),
});

export class UserResolverMock {
  info(input: Parameters<UserResolver["info"]>[0]["input"]) {
    const context = createContextMock();

    return {
      ctx: context,
      input,
      output: {
        ...context.session.user,
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        emailVerified: faker.date.recent().toISOString(),
      } satisfies User,
    };
  }
}
