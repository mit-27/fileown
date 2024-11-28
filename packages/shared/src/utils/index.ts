

export const S3_PROVIDERS = ["AWS_S3","CLOUDFLARE_R2","WASABI_S3","BACKBLAZE_B2","SUPABASE_STORAGE"] as const;

export const PROVIDERS : Record<typeof S3_PROVIDERS[number], string[]> = {
    "AWS_S3" : ["ACCESS_KEY_ID", "SECRET_ACCESS_KEY", "REGION","BUCKET_NAME"],
    "CLOUDFLARE_R2": ["ACCOUNT_ID", "ACCESS_KEY", "SECRET_KEY", "BUCKET_NAME"],
    "WASABI_S3": ["ACCESS_KEY_ID", "SECRET_ACCESS_KEY", "BUCKET_NAME_ID"],
    "BACKBLAZE_B2": ["ACCOUNT_ID", "APPLICATION_KEY", "BUCKET_NAME"],
    "SUPABASE_STORAGE": ["SERVICE_KEY"]
}