require('dotenv').config();
const SlackService = require('./services/slack');
const json2csv = require('json2csv');
const S3Client = require('aws-sdk/clients/s3');
const sprintf = require('sprintf-js').sprintf;
const moment = require('moment');

(async () => {
    let slackService = new SlackService(process.env.SLACK_BOT_TOKEN);
    let s3 = new S3Client({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    });

    let messages = (await slackService.getMessagesInLast24Hours(process.env.CHANNEL_ID))
        .filter(message => message.hasLink())
        .sort((msg1, msg2) => (msg1.reactionCount < msg2.reactionCount) ? 1 : -1);

    await s3.putObject({
        Bucket: process.env.S3_BUCKET,
        Key: sprintf('%s-messages.csv', moment().subtract(1, 'days').format('Y-M-D')),
        Body: Buffer.from(json2csv.parse(messages))
    }).promise();
})();
