#!/usr/bin/env bash

printf "\033[1;33m[1/3] Creating packages for Lambda \033[0m\n"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

printf "\033[1;35m> Preparing the lambda package \033[0m\n"
mkdir ./terraform/environments/production/build
zip -x "*.git*" -r ./terraform/environments/production/build/collect-history-lambda.zip * -x "*terraform*" -x "*.tf" -qq

printf "\033[1;33m[2/3] Deploying on AWS\033[0m\n"
cd "terraform/environments/production"
terraform init
export TF_VAR_slack_bot_token=${SLACK_BOT_TOKEN}
export TF_VAR_channel_id=${CHANNEL_ID}
export TF_VAR_s3_access_key=${AWS_ACCESS_KEY_ID}
export TF_VAR_s3_secret_access_key=${S3_SECRET_ACCESS_KEY}
export TF_VAR_s3_bucket=${S3_BUCKET}
terraform apply -auto-approve
                
cd ${SCRIPT_DIR}
rm -rf ./terraform/environments/production/build