variable "handler" {
  default = "handler.hello"
}

variable "aws_region" {
	default = "eu-central-1"
}

variable "runtime" {
  default = "nodejs12.x"
}

variable "schedule_midnight" {
  default = "cron(0 0 * * ? *)"
}

variable "bucket" {
	default = "codefiction-slack-newsletter"
}

variable "source_package" {
	default = "slack_newsletter_lambda.zip"
}