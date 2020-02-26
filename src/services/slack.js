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
        cursor: cursor
      });

      messages.push(
        ...(await Promise.all(
          response.messages.map(async msg => {
            let sharer = await this.getUserRealNameById(msg.user);
            let reactionCount = !msg.hasOwnProperty('reactions')
              ? 0
              : msg.reactions.reduce(
                  (total, reaction) => total + reaction.count,
                  0
                );

            return new Message(msg.text, sharer, reactionCount, msg.ts);
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
