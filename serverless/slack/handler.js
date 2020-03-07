"use strict";
const crypto = require("crypto");

module.exports.slack = async event => {
  console.log(event);

  if (!verifyRequest(event.headers, event.body)) {
    return {
      statusCode: 401
    };
  } else {
    console.log("request verified");
  }

  const body = JSON.parse(event.body);
  const response = {};

  if (body.challenge) {
    response.challenge = body.challenge;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};

function verifyRequest(headers, body) {
  const baseString = "v0:" + headers["X-Slack-Request-Timestamp"] + ":" + body;

  const hash = crypto
    .createHmac("sha256", process.env.SIGNING_SECRET)
    .update(baseString)
    .digest("hex");

  return "v0=" + hash === headers["X-Slack-Signature"];
}
