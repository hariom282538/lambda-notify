# Mattermost/Slack Notification Service | Serverless | AWS Lambda  

A simple, Serverless Lambda wrapper around the Slack/Mattermost webhook API. Makes it easy to send notifications to Slack/mattermost from your application.

#### Installation

```sh
npm install slack-notify
```

### Usage

Set your custom values --> YOUR_WEBHOOK_URL || YOUR_USERNAME.

### Run

## Start sls offline
```bash
$ sls offline start --skipCacheInvalidation
Serverless: Starting Offline: undefined/undefined.
Serverless: Key with token: d41d8cd98f00b204e9800998ecf8427e
Serverless: Remember to use x-api-key on the request headers

Serverless: Routes for create:
Serverless: POST /create

Serverless: Offline listening on http://localhost:3000
```

## Test with postman

```js
var unirest = require("unirest");

var req = unirest("POST", "http://localhost:3000/create");

req.headers({
  "cache-control": "no-cache",
  "Connection": "keep-alive",
  "content-length": "",
  "accept-encoding": "gzip, deflate",
  "cookie": "BCSI-CS-0698a4026445df01=2",
  "Host": "localhost:3000",
  "Postman-Token": "9434a23f-3eca-4a3c-ba18-dfb53fa15957,06421797-d592-4346-a1c2-1f82c7a66260",
  "Cache-Control": "no-cache",
  "Accept": "*/*",
  "User-Agent": "PostmanRuntime/7.15.0",
  "Content-Type": "application/json",
  "x-api-key": "d41d8cd98f00b204e9800998ecf8427e"
});

req.type("json");
req.send({
  "channel": "DevOps",
  "text": "Allow me to reintroduce myself!"
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});
```


### License

MIT. Copyright &copy; 2019 [Hariom Vashisth](https://medium.com/@hariomvashisth)
