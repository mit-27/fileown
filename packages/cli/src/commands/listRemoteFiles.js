

export const getRemoteFiles = async () => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.R2_BUCKET_NAME
        });

        const response = await r2.send(command);
        console.log("Objects in the bucket:", response.Contents);
    }
    catch (error) {
        console.error("Error listing objects:", error);
    }
}



