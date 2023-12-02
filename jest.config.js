/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // tells Jest where are our test files
  roots: ['<rootDir>/src'],
  // tells Jest to use only TypeScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
