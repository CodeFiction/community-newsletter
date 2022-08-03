import { StartedTestContainer } from 'testcontainers'
import { createLocalstackResources, seedDynamodbTable, startLocalStackContainer } from './common'

require('ts-node').register()

export default async (): Promise<void> => {
  const localStackContainer: StartedTestContainer = await startLocalStackContainer();

  (global as typeof globalThis & { __LOCALSTACK_CONTAINER__: StartedTestContainer }).__LOCALSTACK_CONTAINER__ = localStackContainer

  await createLocalstackResources()
  await seedDynamodbTable()
}
