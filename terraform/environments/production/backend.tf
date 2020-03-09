provider "aws" {
  region = "eu-west-2"
}

terraform {
  backend "s3" {
    bucket = "community-newsletter-app-state"
    key    = "terraform/dev/terraform_dev.tfstate"
    region = "eu-west-2"
  }
}

