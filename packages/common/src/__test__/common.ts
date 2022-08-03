import { GenericContainer, StartedTestContainer } from 'testcontainers'
import * as shell from 'shelljs'
import * as crypto from 'crypto'

export const startLocalStackContainer = async (): Promise<StartedTestContainer> => {
  const localStackContainer = await new GenericContainer('localstack/localstack:0.13.3')
    .withEnv('DEFAULT_REGION', 'eu-central-1')
    .withEnv('DOCKER_HOST', 'unix:///var/run/docker.sock')
    .withEnv('DEBUG', '1')
    .withExposedPorts(4566)
    .start()

  const localstackEndpoint = `http://${localStackContainer.getHost()}:${localStackContainer.getMappedPort(4566)}`

  Object.assign(process.env, { LOCALSTACK_ENDPOINT: localstackEndpoint })
  Object.assign(process.env, { LOCALSTACK_CONTAINER_ID: localStackContainer.getName() })
  Object.assign(process.env, { LOCALSTACK_EDGE_PORT: localStackContainer.getMappedPort(4566) })

  await new Promise(resolve => setTimeout(resolve, 3 * 1000))

  return localStackContainer
}

export const createLocalstackResources = async (): Promise<void> => {
  const appPath = '../.pipeline/deploy/gimli/localstack/gimli.localstack.ts'
  const hash = crypto.randomBytes(8).toString('hex')

  // This will give us an error about CDKToolkit creation. This is because CDKToolkit uses ECR under the hood.
  // LocalStack Community Edition doesn't support ECR. But, it's fine. We can still deploy our cdk app.
  // We might be willing to pay some money for LocalStack PRO in the future?
  // See this issue on GitHub for more information: https://github.com/localstack/aws-cdk-local/issues/57#issuecomment-1030282205
  shell.exec(`
    TARGET_ENVIRONMENT=localstack \
    APP_VERSION=${hash} \
    EDGE_PORT=${process.env.LOCALSTACK_EDGE_PORT} \
    cdklocal bootstrap \
      --app "npx ts-node ${appPath}" \
      --require-approval never
  `)

  shell.exec(`
    TARGET_ENVIRONMENT=localstack \
    APP_VERSION=${hash} \
    EDGE_PORT=${process.env.LOCALSTACK_EDGE_PORT} \
    cdklocal deploy \
      --app "npx ts-node ${appPath}" \
      --require-approval never
  `)
}

export const seedDynamodbTable = async (): Promise<void> => {
  shell.exec(`
    docker exec -i ${process.env.LOCALSTACK_CONTAINER_ID} \
    awslocal dynamodb put-item \
      --table-name localstack-gimli-shortened-urls \
      --item '{ "shortId": { "S": "arwen" }, "originalUrl": { "S": "https://www.armut.com/arwen" }, "resolveCount": { "N": "0" }, "createdAt": { "N": "827889793" } }'
  `)

  shell.exec(`
    docker exec -i ${process.env.LOCALSTACK_CONTAINER_ID} \
    awslocal dynamodb put-item \
      --table-name localstack-gimli-shortened-urls \
      --item '{ "shortId": { "S": "aragorn" }, "originalUrl": { "S": "https://www.armut.com/aragorn" }, "resolveCount": { "N": "2" }, "createdAt": { "N": "927889793" } }'
`)
}
