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