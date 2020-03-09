module "newsletter-collect-history-lambda" {
  source           = "spring-media/lambda/aws"
  version          = "5.1.0"
  filename         = "${path.module}/build/collect-history-lambda.zip"
  function_name    = "CollectHistory"
  handler          = "collectHistoryFunction.index"
  runtime          = "nodejs10.x"
  source_code_hash = filebase64sha256("${path.module}/build/collect-history-lambda.zip")
  publish          = true
  timeout          = 15
  memory_size      = 256

  event = {
    type                = "cloudwatch-event"
    schedule_expression = "rate(4 hours)"
  }

  environment = {
    variables = {
      SLACK_BOT_TOKEN      = var.slack_bot_token
      CHANNEL_ID           = "C0MFTF0Q4"
      S3_ACCESS_KEY        = var.s3_access_key
      S3_SECRET_ACCESS_KEY = var.s3_secret_access_key
      S3_BUCKET            = var.s3_bucket
    }
  }
}

module "newsletter-collect-history-lambda-security-channel" {
  source           = "spring-media/lambda/aws"
  version          = "5.1.0"
  filename         = "${path.module}/build/collect-history-lambda.zip"
  function_name    = "CollectHistorySecurity"
  handler          = "collectHistoryFunction.index"
  runtime          = "nodejs10.x"
  source_code_hash = filebase64sha256("${path.module}/build/collect-history-lambda.zip")
  publish          = true
  timeout          = 15
  memory_size      = 256

  event = {
    type                = "cloudwatch-event"
    schedule_expression = "rate(4 hours)"
  }

  environment = {
    variables = {
      SLACK_BOT_TOKEN      = var.slack_bot_token
      CHANNEL_ID           = "CTKGFDWKA"
      S3_ACCESS_KEY        = var.s3_access_key
      S3_SECRET_ACCESS_KEY = var.s3_secret_access_key
      S3_BUCKET            = var.s3_bucket
    }
  }
}

module "newsletter-collect-history-lambda-gaming-channel" {
  source           = "spring-media/lambda/aws"
  version          = "5.1.0"
  filename         = "${path.module}/build/collect-history-lambda.zip"
  function_name    = "CollectHistoryGaming"
  handler          = "collectHistoryFunction.index"
  runtime          = "nodejs10.x"
  source_code_hash = filebase64sha256("${path.module}/build/collect-history-lambda.zip")
  publish          = true
  timeout          = 15
  memory_size      = 256

  event = {
    type                = "cloudwatch-event"
    schedule_expression = "rate(4 hours)"
  }

  environment = {
    variables = {
      SLACK_BOT_TOKEN      = var.slack_bot_token
      CHANNEL_ID           = "CQ01KDCTE"
      S3_ACCESS_KEY        = var.s3_access_key
      S3_SECRET_ACCESS_KEY = var.s3_secret_access_key
      S3_BUCKET            = var.s3_bucket
    }
  }
}

module "newsletter-collect-history-lambda-random-channel" {
  source           = "spring-media/lambda/aws"
  version          = "5.1.0"
  filename         = "${path.module}/build/collect-history-lambda.zip"
  function_name    = "CollectHistoryRandom"
  handler          = "collectHistoryFunction.index"
  runtime          = "nodejs10.x"
  source_code_hash = filebase64sha256("${path.module}/build/collect-history-lambda.zip")
  publish          = true
  timeout          = 15
  memory_size      = 256

  event = {
    type                = "cloudwatch-event"
    schedule_expression = "rate(4 hours)"
  }

  environment = {
    variables = {
      SLACK_BOT_TOKEN      = var.slack_bot_token
      CHANNEL_ID           = "CKX5L3UTS"
      S3_ACCESS_KEY        = var.s3_access_key
      S3_SECRET_ACCESS_KEY = var.s3_secret_access_key
      S3_BUCKET            = var.s3_bucket
    }
  }
}
