const moment = require('moment');

module.exports.sortByRating = (ratingType, messages) => {
  return messages.sort((msg1, msg2) =>
    msg1.reactionCount < msg2.reactionCount ? 1 : -1
  );
};
