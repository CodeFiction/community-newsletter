module "newsletter-chat-history-database" {
  source            = "../../modules/dynamodb"
  namespace         = "cf"
  stage             = "prod"
  name              = "messages-history"
  hash_key          = "messageId"
  hash_key_type     = "S"
  enable_autoscaler = false
}
