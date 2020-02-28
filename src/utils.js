const punycode = require('punycode');
const emojiData = require('./emoji_data.json');

// Taken from: https://github.com/aaronpk/Slack-IRC-Gateway/blob/541cc464e60e6146c305afd5efc521f6553f690c/emoji.js
module.exports.convertSlackEmojisToPunycode = (text) => {
    let emojiRegex = /\:([a-zA-Z0-9\-_\+]+)\:(?:\:([a-zA-Z0-9\-_\+]+)\:)?/g;
    let converted = text;
    let match;

    // Find all Slack emoji in the message
    while (match = emojiRegex.exec(text)) {
        let emoji = emojiData.find(function (el) {
            return el.short_name == match[1];
        });

        if (emoji) {
            let points = emoji.unified.split("-");
            points = points.map(function (p) {
                return parseInt(p, 16)
            });
            converted = converted.replace(match[0], punycode.ucs2.encode(points));
        }
    }

    return converted;
};
