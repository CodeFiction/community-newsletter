# Serverless Slack Reactions API

automatically creates and updates dynamoDB based on webhooks Slack Event API fires

## to deploy

- install serverless

```
yarn global add serverless
```

- create deployment

```
sls deploy -v --stage prod
```

- create a slack app
- set up event subscriptions
- add `reaction_added` and `reaction_removed` events in `Subscribe to bot events`
- install app to your slack workspace
- install app in the channels where you want it to work
