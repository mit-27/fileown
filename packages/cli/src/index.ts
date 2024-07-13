#!/usr/bin/env node

// import figlet from 'figlet';
import { Command, program } from 'commander';
import dotenv from 'dotenv';
// import { getRemoteFiles } from './commands/listRemoteFiles'
// import { ListObjectsV2Command, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getRemoteFiles } from './commands/listRemoteFiles';
import { downloadFile } from './commands/downloadFiles';
// import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";


// import { r2 } from '../src/lib/r2'
dotenv.config();

program
    .version("0.0.1")
    .description("Boilgen CLI")
    .option("-d, --downloadFile [value]", "Add your value")
    .option("--listRemoteFiles", "List all your remote templates");



program.parse(process.argv);

const options = program.opts();

// const R2 = new S3Client({
//     region: 'auto',
//     endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
//     credentials: {
//         accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
//         secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
//     },

// })

// const getRemoteFiles = async () => {
//     try {
//         console.log(process.env.R2_BUCKET_NAME)
//         const command = new ListObjectsV2Command({
//             Bucket: process.env.R2_BUCKET_NAME
//         });

//         const response = await R2.send(command);
//         console.log(response.Contents)
//         // console.log("Objects in the bucket:", response.Contents);
//     }
//     catch (error) {
//         console.error("Error listing objects:", error);
//     }
// }


if (options.listRemoteFiles) {
    // console.log("Hello")
    getRemoteFiles();
}

if (options.downloadFile) {
    console.log(options.downloadFile)
    downloadFile(options.downloadFile);
}

