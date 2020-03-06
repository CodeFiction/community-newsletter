const { WebClient } = require('@slack/web-api');
const moment = require('moment');
const Message = require('../models/message');

module.exports = class SlackService {
  constructor(token) {
    this.client = new WebClient(token);
  }

  async getMessagesInLastNDays(channelId, n = 7, unit = 'days') {
    let cursor = null;
    let messages = [];

    while (true) {
      let response = await this.client.conversations.history({
        channel: channelId,
        oldest: moment()
          .subtract(n, unit)
          .unix(),
        cursor: cursor,
        limit: 500
      });

      messages.push(
        ...(await Promise.all(
          response.messages.map(async msg => {
            // Commented as we face rate limit by this api call
            // let sharer = await this.getUserRealNameById(msg.user);
            let reactionCount = !msg.hasOwnProperty('reactions')
              ? 0
              : msg.reactions.reduce(
                  (total, reaction) => total + reaction.count,
                  0
                );
            return new Message(msg.text, null, reactionCount, msg.ts * 1000);
          })
        ))
      );

      if (!response.has_more) {
        break;
      }

      cursor = response.response_metadata.next_cursor;
    }

    return messages;
  }

  async getUserRealNameById(id) {
    let response = await this.client.users.info({
      user: id
    });

    return response.user.real_name;
  }
};
