import { envConstants, tryGetEnvContext } from './env.config'

describe('tryGetEnvContext', () => {
  test('should return env context', () => {
    const ctx = tryGetEnvContext()

    expect(ctx).toBeDefined()
    expect(Object.keys(ctx)).toEqual(Object.keys(envConstants))
  })

  test('should throw error when cannot map the all env constants', () => {
    delete process.env.NODE_ENV
    const nodeEnv = process.env.NODE_ENV

    expect(tryGetEnvContext).toThrowError()

    process.env.APP_ENV = nodeEnv
  })
})
