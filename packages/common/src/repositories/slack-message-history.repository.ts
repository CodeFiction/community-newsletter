import { dynamodbDocumentClient } from "../services/dynamodb.service";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { tryGetEnvContext, EnvContext } from "../config/env.config";

const envContext: EnvContext = tryGetEnvContext();
const tableName: string = envContext.dynamodbTableName;
const dynamoDBClient = dynamodbDocumentClient(); // TODO: is it singleton

module.exports.put = async (item) => {
  const cmd = new PutCommand({
    TableName: tableName,
    Item: item,
  });

  await dynamoDBClient.send(cmd);
};

module.exports.getByChannelId = async (channelId: string) => {
  const cmd = new ScanCommand({
    TableName: tableName,
    FilterExpression: "#cid = :id",
    ExpressionAttributeNames: {
      "#cid": "channelId",
    },
    ExpressionAttributeValues: {
      ":id": channelId,
    },
  });

  await dynamoDBClient.send(cmd);
};

module.exports.getAll = async () => {
  const cmd = new ScanCommand({
    TableName: tableName,
  });

  await dynamoDBClient.send(cmd);
};
