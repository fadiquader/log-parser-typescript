module.exports = {
  "testTimeout": 360000,
  clearMocks: true,
  // setupFilesAfterEnv: ["<rootDir>/tests/test-utils/setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  "moduleFileExtensions": [
    "js",
    "ts"
  ],
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
