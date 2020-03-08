const moment = require('moment');

const sortingMethods = {
  default: messages => {
    return messages.sort((msg1, msg2) =>
      msg1.reactionCount < msg2.reactionCount ? 1 : -1
    );
  },
  hot: messages => {
    const now = moment();

    return messages.sort((msg1, msg2) => {
      const msg1Date = moment(msg1.timestamp);
      const msg2Date = moment(msg2.timestamp);
      msg1.rating = msg1.reactionCount / now.diff(msg1Date);
      msg2.rating = msg2.reactionCount / now.diff(msg2Date);
      return msg1.rating < msg2.rating ? 1 : -1;
    });
  },
  latest: messages => {
    return messages.sort((msg1, msg2) =>
      msg1.timestamp < msg2.timestamp ? 1 : -1
    );
  }
};

module.exports.sortByRating = (sortingMethod, messages) => {
  sortingMethod = sortingMethod ? sortingMethod.toLowerCase() : 'default';
  if (typeof sortingMethods[sortingMethod] !== 'function') {
    sortingMethod = 'default';
  }
  return sortingMethods[sortingMethod](messages);
};
