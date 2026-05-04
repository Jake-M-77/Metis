module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.app.json"
    }
  }
};