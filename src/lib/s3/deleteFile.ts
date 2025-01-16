import { ServerS3Client } from "@/lib/s3/sererS3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function deleteFile({ fileName }: { fileName: string }) {
  const session = getKindeServerSession();
  const user = await session.getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }

  const bucketName = process.env.S3_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("Bucket name is not defined");
  }

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });

  await ServerS3Client.send(command);

  return {
    message: "File deleted successfully",
    isError: false,
  };
}
