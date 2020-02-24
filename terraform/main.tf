provider "aws" {
    region = "${var.aws_region}"
}

resource "aws_s3_bucket" "bucket-lambda-deployments" {
  bucket = "${var.bucket}"
  region = "${var.aws_region}"
  acl    = "private"
}

resource "aws_s3_bucket_object" "file_upload" {
  bucket = "${aws_s3_bucket.bucket-lambda-deployments.bucket}"
  key    = "${var.source_package}"
  source = "${var.source_package}"
  etag   = "${filemd5("${var.source_package}")}"
}

resource "aws_cloudwatch_event_rule" "slack-newsletter-event" {
    name = "slack-newsletter-event"
    description = "slack-newsletter-event"
    schedule_expression = "${var.schedule_midnight}"
}

resource "aws_cloudwatch_event_target" "slack-newsletter-event-lambda-target" {
    target_id = "slack-newsletter-event-lambda-target"
    rule = "${aws_cloudwatch_event_rule.slack-newsletter-event.name}"
    arn = "${aws_lambda_function.slack_newsletter_lambda.arn}"
}

resource "aws_iam_role" "slack_newsletter_lambda" {
    name = "slack_newsletter_lambda"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

data "aws_iam_policy_document" "s3-access-ro" {
    statement {
        actions = [
            "s3:GetObject",
            "s3:PutObject",
            "s3:ListBucket",
        ]
        resources = [
            "arn:aws:s3:::*",
        ]
    }
}

resource "aws_iam_policy" "s3-access-ro" {
    name = "s3-access-ro"
    path = "/"
    policy = "${data.aws_iam_policy_document.s3-access-ro.json}"
}

resource "aws_iam_role_policy_attachment" "s3-access-ro" {
    role       = "${aws_iam_role.slack_newsletter_lambda.name}"
    policy_arn = "${aws_iam_policy.s3-access-ro.arn}"
}

resource "aws_iam_role_policy_attachment" "basic-exec-role" {
    role       = "${aws_iam_role.slack_newsletter_lambda.name}"
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "slack_newsletter_lambda" {
    filename = "${var.source_package}"
    function_name = "slack_newsletter_lambda"
    role = "${aws_iam_role.slack_newsletter_lambda.arn}"
    handler = "slack_newsletter_lambda.handler"
    runtime = "nodejs12.x"
    timeout = 10
    source_code_hash = "${filemd5("${var.source_package}")}"
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_slack_newsletter" {
    statement_id = "AllowExecutionFromCloudWatch"
    action = "lambda:InvokeFunction"
    function_name = "${aws_lambda_function.slack_newsletter_lambda.function_name}"
    principal = "events.amazonaws.com"
    source_arn = "${aws_cloudwatch_event_rule.slack-newsletter-event.arn}"
}