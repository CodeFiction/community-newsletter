const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

module.exports.put = async params => {
  return dynamoDB
    .put({ TableName: process.env.TABLE_NAME, Item: params })
    .promise();
};
