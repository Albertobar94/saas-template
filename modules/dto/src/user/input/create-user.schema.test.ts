import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { UserRole } from "@package/database/dto";
import { CreateUserSchema } from "./create-user.schema";

describe("create User Schema", () => {
  it("successfully parses payload", () => {
    expect.hasAssertions();

    // Arrange
    const payload = {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      role: UserRole.Admin,
      image: faker.image.url(),
    };

    // Act & Assert
    expect(CreateUserSchema.parse(payload)).toMatchObject(payload);
  });

  it("throws an error when payload in not correct", () => {
    expect.hasAssertions();

    // Arrange
    const payload = {
      email: faker.internet.userName(),
    };

    // Act & Assert
    expect(() => CreateUserSchema.parse(payload)).toThrow(ZodError);
  });
});
