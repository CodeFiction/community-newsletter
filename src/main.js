require('dotenv').config();
const SlackService = require('./services/slack');
const { uploadFiles } = require('./services/s3');
const { getByChannelId } = require('./services/dynamodb');
const sprintf = require('sprintf-js').sprintf;
const moment = require('moment');

module.exports.getMessages = async channelId => {
  const slackService = new SlackService(process.env.SLACK_BOT_TOKEN);
  let messages = await slackService.getMessagesInLastNDays(channelId, 90);
  return messages.filter(message => message.hasLink());
};

module.exports.getMessagesFromDb = async channelId => {
  const messages = await getByChannelId(channelId);
  return messages.Items;
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
