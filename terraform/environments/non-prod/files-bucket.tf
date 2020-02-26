module "newsletter-static-bucket" {
  source        = "../../modules/s3/web_hosting_s3_bucket"
  bucket        = "newsletter.codefiction.tech"
  region        = "eu-west-2"
  remote_state  = "${var.remote_state}"
  web_page_user = "newsletter-static-bucket-user"
}