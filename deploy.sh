#!/usr/bin/env bash

printf "\033[1;33m[1/3] Creating packages for Lambda \033[0m\n"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

printf "\033[1;35m> Checking for Lambda functions in ${SCRIPT_DIR} \033[0m\n"

rm slack_newsletter_lambda.zip
zip -x "*.git*" -r slack_newsletter_lambda.zip * -x "*terraform*" -x "*.tf"

printf "\033[1;33m[2/3] Deploying on AWS\033[0m\n"
cd "terraform/"
terraform apply
cd ${SCRIPT_DIR}