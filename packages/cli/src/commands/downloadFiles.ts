import { GetObjectCommand } from "@aws-sdk/client-s3";
import path from 'path';
import fs from 'fs';
import { R2 } from '../lib/r2'
import { Transform } from 'stream';
import readline from 'readline';


// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create a transform stream to modify the content
const transformStream = new Transform({
    transform(chunk: any, encoding: any, callback: any) {
        let content = chunk.toString();
        const placeholders = [...new Set(content.match(/__\w+/g))] || [];

        const replaceNextPlaceholder = () => {
            if (placeholders.length === 0) {
                this.push(content);
                callback();
                return;
            }

            const placeholder: any = placeholders.shift();
            rl.question(`Enter value for ${placeholder}: `, (answer: string) => {
                content = content.replace(new RegExp(placeholder, 'g'), answer);
                replaceNextPlaceholder();
            });
        };

        replaceNextPlaceholder();
    }
});



export async function downloadFile(myfileName: string): Promise<void> {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: myfileName,
        });

        const response = await R2.send(command);
        const fileName = path.basename(myfileName);
        const writeStream = fs.createWriteStream(fileName);

        // response.Body.pipe(writeStream);
        (response.Body as unknown as NodeJS.ReadableStream).pipe(transformStream)
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