import { NextResponse } from 'next/server'
import chalk from 'chalk'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { r2 } from '@/lib/r2'
import { NextApiRequest, NextApiResponse } from 'next'

export async function POST(request: Request, res: NextApiResponse) {
	try {
		// const {fileName,fileContent} = JSON.parse(request.body);

		const data = await request.json()

		const { fileName, fileContent } = data



		const command = new PutObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: fileName,
			Body: fileContent
		})

		const response = await r2.send(command);
		console.log("File uploaded successfully:", response);
		// return response;



		return NextResponse.json({ message: 'Successfully uploaded' })
	} catch (err) {
		console.log('error')
	}
}

// export async function POST(request: Request) {
// 	try {
// 		console.log(chalk.yellow(`Generating an upload URL!`))

// 		const signedUrl = await getSignedUrl(
// 			r2,
// 			new PutObjectCommand({
// 				Bucket: process.env.R2_BUCKET_NAME,
// 				Key: `filename.pdf`,

// 			}),
// 			{ expiresIn: 60 }
// 		)

// 		console.log(chalk.green(`Success generating upload URL!`))

// 		return NextResponse.json({ url: signedUrl })
// 	} catch (err) {
// 		console.log('error')
// 	}
// }


