'use strict';

let YOUR_WEBHOOK_URL = 'https://chat.example.in/hooks/token';
var slack = require('slack-notify')(YOUR_WEBHOOK_URL);
var payloadCheck = require('payload-validator');

module.exports.create = async (event, context) => {
  console.log(event);
  let payloadCheckPromise, webhookPromise, processedBody;
  let expectedPayload = {
    "channel": "",
    "text": "",
    "icon_url": "",
    "username": ""
  };

  payloadCheckPromise = new Promise((resolve, reject) => {
    if (event.body) {
      processedBody = JSON.parse(event.body);
      let result = payloadCheck.validator(processedBody, expectedPayload, ["channel", "text"], false);
      if (result.success) {
        return resolve({ "message": "Payload is valid" });
      } else {
        return reject({ "error": result.response.errorMessage });
      }
    } else {
      return reject({ "error": "paylod not correct" });
    }
  });

  webhookPromise = new Promise((resolve, reject) => {
    slack.send({
      channel: processedBody.channel,
      icon_url: 'https://11m5ki43y82budjol1gjvv5s-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/chat-bot-call-to-action-white-paper1.png',
      text: processedBody.text,
      username: 'YOUR_USERNAME'
    }, function (err) {
      if (err) {
        return reject({ error: "API error: " + err });
      } else {
        return resolve({ message: 'Message received!' });
      }
    });
  });

  try {
    await payloadCheckPromise;
    await webhookPromise;
    return { statusCode: 200, body: JSON.stringify({ message: 'Message posted!' }) };
  }
  catch (error) {
    return error;
  }
};
