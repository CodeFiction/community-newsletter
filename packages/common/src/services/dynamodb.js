const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "eu-west-2"
});
const tableName = "cf-prod-messages-history";

module.exports.put = async params => {
  return dynamoDB.put({ TableName: tableName, Item: params }).promise();
};

module.exports.getByChannelId = async channelId => {
  const params = {
    TableName: tableName
  };
  if (channelId) {
    params.FilterExpression = "#cid = :id";
    params.ExpressionAttributeNames = {
      "#cid": "channelId"
    };
    params.ExpressionAttributeValues = {
      ":id": channelId
    };
  }
  return dynamoDB.scan(params).promise();
};
