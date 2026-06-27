import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../core/s3";
import { config } from "../core/config";

export async function uploadToS3(buffer: Buffer, key: string, mime: string) {
  const command = new PutObjectCommand({
    Bucket: config.S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: mime
  });

  await s3.send(command);

  return `s3://${config.S3_BUCKET}/${key}`;
}
