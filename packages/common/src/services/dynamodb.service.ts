import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { tryGetEnvContext, EnvContext } from "../config/env.config";

const envContext: EnvContext = tryGetEnvContext();

/**
 * The DynamoDB client based on AWS region defined in environment.
 */
const dynamodbClient = (): DynamoDBClient => {
  if (envContext.useLocalStack === "1") {
    return new DynamoDBClient({
      endpoint: envContext.localStackEndpoint,
      region: envContext.awsRegion,
    });
  }

  return new DynamoDBClient({ region: envContext.awsRegion });
};

/**
 * The DynamoDB document client based on DynamoDB client.
 */
 export const dynamodbDocumentClient = (): DynamoDBClient => DynamoDBDocumentClient.from(dynamodbClient())