const { put } = require('./src/services/dynamodb');
const { getMessages } = require('./src/main');

module.exports.index = async () => {
  try {
    const messages = await getMessages(process.env.CHANNEL_ID);
    console.log(
      `Total Messages to process ${messages.length} for channel ${process.env.CHANNEL_ID}`
    );

    const promises = [];
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.messageId) {
        promises.push(put(message));
      } else {
        console.log(`Skipped message: ${JSON.stringify(message)}`);
      }
    }

    await Promise.all(promises);
    return true;
  } catch (e) {
    console.log(`Error occured: \n ${JSON.stringify(e)}`);
    return false;
  }
};
