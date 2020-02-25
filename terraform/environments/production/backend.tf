provider aws {
  region = "eu-west-2"
}

terraform {
  backend "s3" {
    bucket = "community-newsletter-app-state-production"
    key    = "terraform/prod/terraform_prod.tfstate"
    region = "eu-west-2"
  }
}
