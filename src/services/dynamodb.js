const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'eu-west-2'
});

module.exports.put = async params => {
  return dynamoDB
    .put({ TableName: 'cf-prod-messages-history', Item: params })
    .promise();
};
