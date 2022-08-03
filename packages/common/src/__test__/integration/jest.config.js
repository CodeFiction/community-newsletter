/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const baseConfig = require('../jest.config')

const config = {
  testMatch: ['**/*.integration.spec.ts'],
  testTimeout: 5 * 60 * 1000,
  globalSetup: './__test__/setup.ts',
  globalTeardown: './__test__/teardown.ts'
}

module.exports = Object.assign({}, baseConfig, config)

process.env = Object.assign(process.env, {
  NODE_ENV: 'development',
  DYNAMODB_TABLE_NAME: 'localstack-gimli-shortened-urls',
  AWS_REGION: 'eu-central-1',
  DEFAULT_FORWARD_LOCATION: 'https://armut.test'
})
