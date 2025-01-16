import "server-only";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { ServerS3Client } from "@/lib/s3/sererS3Client";

export function getSignedFileUrl({
  imageName,
  expiresIn = 600,
}: {
  imageName: string;

  expiresIn: number;
}) {
  const bucketName = process.env.S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("Bucket name is not defined");
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: imageName,
  });

  return getSignedUrl(ServerS3Client, command, { expiresIn: expiresIn });
}
