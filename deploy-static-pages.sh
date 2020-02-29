aws s3 sync ./static s3://newsletter.codefiction.tech --delete
aws cloudfront create-invalidation --distribution-id E35ZZEQ061YQP7 --paths "/*"
