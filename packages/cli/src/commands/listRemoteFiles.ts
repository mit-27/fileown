import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { R2 } from '../lib/r2'


export const getRemoteFiles = async () => {
    try {
        console.log(process.env.R2_BUCKET_NAME)
        const command = new ListObjectsV2Command({
            Bucket: process.env.R2_BUCKET_NAME
        });

        // console.log(R2)

        const response = await R2.send(command);
        // console.log(response.Contents)
        console.log("Objects in the bucket:", response.Contents);
    }
    catch (error) {
        console.error("Error listing objects:", error);
    }
}



