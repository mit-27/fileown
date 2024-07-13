import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv';
dotenv.config();


export const R2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },

})

// export const R2 = "" + process.env.R2_ACCOUNT_ID