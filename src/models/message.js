const { convertSlackEmojisToPunycode } = require('../utils');

module.exports = class Message {
  constructor(text, sharer, reactionCount, timestamp, messageId) {
    this.links = [];
    this.setText(text);
    this.sharer = sharer;
    this.reactionCount = reactionCount;
    this.timestamp = timestamp;
    this.messageId = messageId;
  }

  setText(text) {
    text = convertSlackEmojisToPunycode(text);

    this.text = text.replace(/<(\S+)>/g, (_, match) => {
      // Remove match if it is a mention
      if(match.match(/^#|!|@/)) {
        return '';
      }

      let link = match.split('|')[0];
      this.links.push(link);

      return link;
    }).trim();
  }

  hasLink() {
    return this.links.length > 0;
  }
};
