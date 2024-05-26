import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { UserRole } from "@package/database/dto";
import { UpdateUserSchema } from "./update-user.schema";

describe("update user schema", () => {
  it("successfully parses payload", () => {
    expect.hasAssertions();

    // Arrange
    const payload = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      image: faker.image.url(),
    };

    // Act & Assert
    expect(UpdateUserSchema.parse(payload)).toMatchObject(payload);
  });

  it("throws an error when payload in not correct", () => {
    expect.hasAssertions();

    // Arrange
    const payload = {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      role: UserRole.User,
      image: faker.image.url(),
    };

    // Act
    const actor = () => UpdateUserSchema.parse(payload);

    // Assert
    expect(actor).toThrow(ZodError);
    expect(actor).toThrow("Required");
  });
});
