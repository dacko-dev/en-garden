import "server-only";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ServerS3Client } from "@/lib/s3/sererS3Client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ACCEPTED_FILE_TYPES } from "@/lib/constants";

export async function putSignedFileUrl({
  fileName,
  fileType,
  fileSize,
  checksum,
  expiresIn = 600,
}: {
  fileName: string;
  fileType: string;
  fileSize: number;
  checksum: string;
  expiresIn?: number;
}) {
  const session = getKindeServerSession();
  const user = await session.getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const bucketName = process.env.S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("Bucket name is not defined");
  }

  if (!ACCEPTED_FILE_TYPES.includes(fileType)) {
    throw new Error("Invalid file type");
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {
      "user-id": user.id,
    },
  });

  return getSignedUrl(ServerS3Client, command, { expiresIn: expiresIn });
}
