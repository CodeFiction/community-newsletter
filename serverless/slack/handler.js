"use strict";

module.exports.slack = async event => {
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
