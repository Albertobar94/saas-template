import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { UserInfoSchema } from "./user-info.schema";

describe("user Info Schema", () => {
  it("userInfoSchema: Successfully parses payload with id", () => {
    expect.hasAssertions();

    // Arrange
    const payload = {
      id: faker.string.uuid(),
    };

    // Act & Assert
    expect(UserInfoSchema.parse(payload)).toMatchObject(payload);
  });

  it("userInfoSchema: Successfully parses payload with email", () => {
    expect.hasAssertions();

    // Arrange
    const payload = {
      email: faker.internet.email(),
    };

    // Act & Assert
    expect(UserInfoSchema.parse(payload)).toMatchObject(payload);
  });

  it("userInfoSchema: Throws an error when payload in not correct", () => {
    expect.hasAssertions();

    // Arrange
    const payload = {};

    // Act & Assert
    expect(() => UserInfoSchema.parse(payload)).toThrow(ZodError);
    expect(() => UserInfoSchema.parse(payload)).toThrow(
      "Either id or email must be provided",
    );
  });

  it("userInfoSchema: Should not throw an error when payload is undefined", () => {
    expect.hasAssertions();

    // Arrange
    const payload = undefined;

    // Act & Assert
    expect(() => UserInfoSchema.parse(payload)).not.toThrow();
  });
});
