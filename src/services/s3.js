const S3Client = require("aws-sdk/clients/s3");
const json2csv = require("json2csv");

const s3 = new S3Client({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

module.exports.uploadFiles = async ({ bucket, messages, fileName }) => {
  return await s3
    .putObject({
      Bucket: bucket,
      Key: fileName,
      Body: Buffer.from(json2csv.parse(messages))
    })
    .promise();
};
