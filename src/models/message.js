const { convertSlackEmojisToPunycode } = require('../utils');

module.exports = class Message {
  constructor(text, sharer, reactionCount, timestamp) {
    this.links = [];
    this.setText(text);
    this.sharer = sharer;
    this.reactionCount = reactionCount;
    this.timestamp = timestamp;
  }

  setText(text) {
    text = convertSlackEmojisToPunycode(text);

    let linkRegex = /<(http[\S]+)>/g;

    this.text = text.replace(linkRegex, (_, link) => {
      link = link.split('|')[0];
      this.links.push(link);

      return link;
    });
  }

  hasLink() {
    return this.links.length > 0;
  }
};
