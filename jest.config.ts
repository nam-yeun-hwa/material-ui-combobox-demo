import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // testEnvironment: "node",
  verbose: true,
  collectCoverage: true,

  // Jest 특정경로 테스트 진행 X
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  // Jest 절대경로 사용
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^utils/(.*)": "<rootDir>/src/utils/$1",
    "\\.(css|less)$": "<rootDir>/tests/styleMock.ts",
  },
  setupFilesAfterEnv: ["./setupTests.ts"],
};

export default config;
