import type { Config } from "jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  clearMocks: true,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: ["src/server/**/*.ts"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: {
    "^@/server/(.*)$": "<rootDir>/src/server/$1",
    "^@/features/(.*)$": "<rootDir>/src/features/$1",
  },
};

export default config;
