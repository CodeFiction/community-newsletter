require('dotenv').config();
const SlackService = require('./services/slack');
const { uploadFiles } = require('./services/s3');
const sprintf = require('sprintf-js').sprintf;
const moment = require('moment');

module.exports.getMessages = async () => {
  const slackService = new SlackService(process.env.SLACK_BOT_TOKEN);
  const messages = await slackService.getMessagesInLastNDays(
    process.env.CHANNEL_ID
  );

  return messages
    .filter(message => message.hasLink())
    .sort((msg1, msg2) => (msg1.reactionCount < msg2.reactionCount ? 1 : -1));
};

module.exports.uploadMessages = async messages => {
  const fileName = sprintf(
    '%s-messages.csv',
    moment()
      .subtract(1, 'days')
      .format('Y-M-D')
  );
  return await uploadFiles({
    bucket: process.env.S3_BUCKET,
    messages,
    fileName
  });
};
