require('ts-node').register()

export default async (): Promise<void> => {
  global.__LOCALSTACK_CONTAINER__.stop()
}
