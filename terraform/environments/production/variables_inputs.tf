variable "remote_state" {
  default = {
    bucket = "community-newsletter-app-state"
    key    = "terraform/dev/terraform_dev.tfstate"
    region = "eu-west-2"
  }
}

variable "slack_bot_token" {}
variable "channel_id" {}
variable "s3_access_key" {}
variable "s3_secret_access_key" {}
variable "s3_bucket" {}
