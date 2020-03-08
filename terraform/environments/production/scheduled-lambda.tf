module "newsletter-collect-history-lambda" {
  source           = "spring-media/lambda/aws"
  version          = "5.1.0"
  filename         = "${path.module}/build/collect-history-lambda.zip"
  function_name    = "CollectHistory"
  handler          = "collectHistoryFunction.index"
  runtime          = "nodejs10.x"
  source_code_hash = filebase64sha256("${path.module}/build/collect-history-lambda.zip")
  publish          = true

  event = {
    type                = "cloudwatch-event"
    schedule_expression = "rate(24 hours)"
  }

  environment = {
    variables = {
      SLACK_BOT_TOKEN      = var.slack_bot_token
      CHANNEL_ID           = var.channel_id
      S3_ACCESS_KEY        = var.s3_access_key
      S3_SECRET_ACCESS_KEY = var.s3_secret_access_key
      S3_BUCKET            = var.s3_bucket
    }
  }
}

