## CodeFiction Community Newsletter

This project meant to fetch all slack messages with links shared in various [Codefiction](https://codefiction.tech) community slack channels and display them in an order based on their engagements by the [Codefiction Community](https://join.slack.com/t/codefiction/shared_invite/enQtNzIzNzg3OTY4NTgwLTFhOWNlZjQ0MDU3YzYxMjg0YzcwYTkzOGNkOGM4MjlkM2Y1MTQ5ODM2Y2UzNTdjODdhNzQyZjY0ZjA3Mzk0ZTE).

As a next step, the messages collected from the channels will be shared as an email newsletter.

## How to run the project

This repository contains the user interface of <https://newsletter.codefiction.tech> website as well as AWS Lambda functions and the API.

### Dependencies

In order to deploy the project in your own AWS account, you need to install [hashicorp terraform](https://www.terraform.io/) and need to have the valid AWS credentials installed in your environment.

Also since this application is built in NodeJs you might also need to install the latest version of NodeJs as a runtime environment.

### Building the AWS Infrastructure

All the infrastructure code is under the [/terraform/environments/production](/terraform/environments/production) folder. We are keeping the terraform state remotely in a S3 bucket as stated in the [backend.tf](https://github.com/CodeFiction/community-newsletter/blob/master/terraform/environments/production/backend.tf#L7) therefore you need to create that bucket or an equivalent in your own AWS account in order to initialise the terraform environment.

After creating the remote state s3 bucket you need to run the `./build.sh` command to install the resources required for this project. This will spin up the resources listed in [/terraform/environments/production](/terraform/environments/production) folder.

### Running the application

If you want to test the NodeJs server you need to create a new `.env` with the following variables.

```.env
SLACK_BOT_TOKEN=....
CHANNEL_ID=....
S3_ACCESS_KEY=....
S3_SECRET_ACCESS_KEY=....
S3_BUCKET=....
```

After having the `.env` file or the environment variables in place you can run `npm start` to kickstart the API application.
