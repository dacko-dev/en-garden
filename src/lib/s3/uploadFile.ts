import "server-only";

import { generateImageName } from "@/lib/utils";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ServerS3Client } from "@/lib/s3/sererS3Client";

export async function uploadImageFileToS3Bucket({
  imageFile,
}: {
  imageFile: File;
}) {
  const bucketName = process.env.S3_BUCKET_NAME_ITEM_IMAGES;
  if (!bucketName) {
    throw new Error("S3_BUCKET_NAME_ITEM_IMAGES is not defined");
  }

  const newImageName = generateImageName(imageFile.type);

  // Create a buffer from the image file
  const arrayBuffer = await imageFile.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);

  // Upload the image to S3
  try {
    await ServerS3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newImageName,
        // body must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-l an Array-like Object
        Body: imageBuffer,
        ContentType: imageFile.type,
      })
    );
  } catch (error) {
    console.error("Error uploading image to S3", error);
    throw new Error("Internal server error");
    // TODO: delete any uploaded images here
  }
  return newImageName;
}
