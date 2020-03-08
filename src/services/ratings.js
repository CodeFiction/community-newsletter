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
      msg1.weight =
        msg1.reactionCount / ((moment(now.diff(msg1Date)).days() % 30) + 1);
      msg2.weight =
        msg2.reactionCount / ((moment(now.diff(msg2Date)).days() % 30) + 1);
      return msg1.weight < msg2.weight ? 1 : -1;
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
