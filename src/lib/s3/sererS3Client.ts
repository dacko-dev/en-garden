import "server-only";

import { S3Client } from "@aws-sdk/client-s3";
import { setupEnv } from "@/lib/setupEnv";

setupEnv();

const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.IAM_ACCESS_KEY;
const secretAccessKey = process.env.IAM_SECRET_ACCESS_KEY;

if (!region) {
  throw new Error("S3_BUCKET_REGION is not set");
}
if (!accessKeyId) {
  throw new Error("IAM_ACCESS_KEY is not set");
}
if (!secretAccessKey) {
  throw new Error("IAM_SECRET_ACCESS_KEY is not set");
}

export const ServerS3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});
