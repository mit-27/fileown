#!/usr/bin/env node

import figlet from 'figlet';
import { Command, program } from 'commander';
import dotenv from 'dotenv';
import chalk from "chalk";
import { Transform } from 'stream';
import readline from 'readline';
// import { getRemoteFiles } from './commands/listRemoteFiles'
import { ListObjectsV2Command, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import path from 'path';

// import { r2 } from '../src/lib/r2'
dotenv.config();

program
    .version("1.0.0")
    .description("My Boigen CLI")
    .option("-d, --downloadFile [value]", "Download your template file name")
    .option("--listRemoteFiles", "List your template files");



program.parse(process.argv);

const options = program.opts();

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create a transform stream to modify the content
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        let content = chunk.toString();
        const placeholders = [...new Set(content.match(/__\w+/g))] || [];

        const replaceNextPlaceholder = () => {
            if (placeholders.length === 0) {
                this.push(content);
                callback();
                return;
            }

            const placeholder = placeholders.shift();
            rl.question(`Enter value for ${placeholder}: `, (answer) => {
                content = content.replace(new RegExp(placeholder, 'g'), answer);
                replaceNextPlaceholder();
            });
        };

        replaceNextPlaceholder();
    }
});

const r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
})

const getRemoteFiles = async () => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.R2_BUCKET_NAME
        });

        const response = await r2.send(command);
        // console.log("Objects in the bucket:", response.Contents);
        console.log("Available Files : ")
        response.Contents.forEach(item => {
            console.log(item.Key);
        });
    }
    catch (error) {
        console.error("Error listing objects:", error);
    }
}

async function downloadFile(myfileName) {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: myfileName,
        });

        const response = await r2.send(command);
        const fileName = path.basename(myfileName);
        const writeStream = fs.createWriteStream(fileName);

        // response.Body.pipe(writeStream);
        response.Body
            .pipe(transformStream)
            .pipe(writeStream);

        return new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                console.log(`File downloaded successfully: ${fileName}`);
                resolve();
            });
            writeStream.on('error', (err) => {
                console.error('Error writing file:', err);
                reject(err);
            });
        });

    }
    catch (error) {
        console.error("Error downloading file:", error);
    }
}

if (options.listRemoteFiles) {
    getRemoteFiles();
}

if (options.downloadFile) {
    console.log(options.downloadFile)
    downloadFile(options.downloadFile);
}

