const querystring = require("querystring");

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async function handler() {
  try {
    const data = querystring.stringify({
      token: process.env.SLACK_BOT_TOKEN,
      channel: process.env.CHANNEL_ID,
      oldest: getDateFilter()
    });
    const options = {
      host: "slack.com",
      port: 443,
      method: "POST",
      path: "/api/conversations.history",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": data.length
      }
    };
    const conversations = JSON.parse(await postRequest(options, data));
    console.log(conversations);

    const messages = conversations.messages;
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      const links = getLinks(message);
      if (links.length > 0) {
        const params = {
          TableName: process.env.TABLE_NAME,
          Item: {
            messageTs: message.ts,
            text: message.text,
            links,
            reactionCount: getReactionCount(message)
          }
        };
        console.log(params);

        await dynamoDb.put(params).promise();
      }
    }
  } catch (e) {
    console.log(e);
  }
};

function postRequest(options, data) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = require("https");
    const request = lib.request(options, response => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error("Failed to load page, status code: " + response.statusCode)
        );
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on("data", chunk => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on("end", () => resolve(body.join("")));
    });
    // handle connection errors of the request
    request.on("error", err => reject(err));
    request.write(data);
    request.end();
  });
}

function getLinks(message) {
  const links = [];
  if (message.blocks) {
    for (let b = 0; b < message.blocks.length; b++) {
      const block = message.blocks[b];

      if (block.elements) {
        for (let e = 0; e < block.elements.length; e++) {
          const element = block.elements[e];

          if (element.elements) {
            for (let ne = 0; ne < element.elements.length; ne++) {
              const nestedElement = element.elements[ne];

              if (nestedElement.type && nestedElement.type === "link") {
                links.push(nestedElement.url);
              }
            }
          }
        }
      }
    }
  }
  return links;
}

function getReactionCount(message) {
  let reactionCount = 0;

  if (message.reactions) {
    for (let r = 0; r < message.reactions.length; r++) {
      reactionCount += message.reactions[r].count;
    }
  }

  return reactionCount;
}

function getDateFilter() {
  const date = new Date();
  date.setDate(date.getDate() - process.env.DAYS_FILTER);
  return (date.getTime() / 1000).toString();
}
