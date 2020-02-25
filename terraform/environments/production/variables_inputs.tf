variable "remote_state" {
  default = {
    bucket = "community-newsletter-app-state"
    key    = "terraform/prod/terraform_prod.tfstate"
    region = "eu-west-2"
  }
}
