const { put } = require("./src/services/dynamodb");
const { getMessages } = require("./src/main");

module.exports.index = async () => {
  try {
    const messages = await getMessages(process.env.CHANNEL_ID);
    console.log(messages);

    const promises = [];
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      promises.push(put(message));
    }

    await Promise.all(promises);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
