/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  rootDir: '../../',
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['./node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  injectGlobals: true,
  slowTestThreshold: 30,
  detectOpenHandles: true
}
