/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const baseConfig = require('../jest.config')

const config = {
  testMatch: ['**/*.unit.spec.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  collectCoverage: true,
  silent: true
}

module.exports = Object.assign({}, baseConfig, config)

process.env = Object.assign(process.env, {
  NODE_ENV: 'test',
  DYNAMODB_TABLE_NAME: 'test-gimli-shortened-urls',
  AWS_REGION: 'mars-central-1',
  DEFAULT_FORWARD_LOCATION: 'https://armut.test'
})
