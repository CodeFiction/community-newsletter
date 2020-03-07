"use strict";
const crypto = require("crypto");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.slack = async event => {
  try {
    console.log(event);

    if (!verifyRequest(event.headers, event.body)) {
      return {
        statusCode: 401
      };
    } else {
      console.log("request verified");
    }

    const body = JSON.parse(event.body);

    if (body.challenge) {
      return {
        statusCode: 200,
        body: JSON.stringify({ challenge: body.challenge })
      };
    } else if (body.event.item.type !== "message") {
      // return here since we should only count messages?
      return { statusCode: 200 };
    }

    const params = { TableName: process.env.DYNAMODB_TABLE, Item: {} };

    let point = 0;
    const eventType = body.event.type;
    if (eventType === "reaction_added") {
      point = 1;
    } else if (eventType === "reaction_removed") {
      point = -1;
    }

    const messageTs = body.event.item.ts;

    const existing = await dynamoDb
      .get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { messageTs }
      })
      .promise();

    if (existing.Item) {
      params.Item = existing.Item;
      params.Item.points = params.Item.points + point;
    } else {
      params.Item = { messageTs, points: point };
    }

    await dynamoDb.put(params).promise();

    return { statusCode: 200 };
  } catch (e) {
    console.log(e);
  }
};

function verifyRequest(headers, body) {
  const baseString = "v0:" + headers["X-Slack-Request-Timestamp"] + ":" + body;

  const hash = crypto
    .createHmac("sha256", process.env.SIGNING_SECRET)
    .update(baseString)
    .digest("hex");

  return "v0=" + hash === headers["X-Slack-Signature"];
}
