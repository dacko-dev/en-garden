"use server";

import { db } from "@/db/export";
import {
  addresses,
  addressInsertSchema,
  addressUpdateSchema,
  commissionFormSchema,
  commissionInsertSchema,
  commissions,
  companies,
  companyInsertSchema,
  recurring,
  recurringInsertSchema,
} from "@/db/schema";
import { MAX_ADDRESS_COUNT } from "@/lib/constants";
import { deleteFile } from "@/lib/s3/deleteFile";
import { putSignedFileUrl } from "@/lib/s3/putSignetFileUrl";
import { computeSHA256, generateImageName } from "@/lib/utils";
import { ActionResponseWithIssues, commissionFormSchemaType } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

// TODO: add checks for addresses actions if the address is related to commissions

export async function addAddressAction({
  address,
  pathToRevalidate,
}: {
  address: z.infer<typeof addressInsertSchema>;
  pathToRevalidate?: string;
}): Promise<ActionResponseWithIssues<number>> {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    if (address.user_id !== user.id) {
      throw new Error("You are not authorized");
    }

    const parsedResult = addressInsertSchema.safeParse(address);
    if (!parsedResult.success) {
      return {
        message: "Invalid input",
        isError: true,
        issues: parsedResult.error.issues,
      };
    }
    const parsedAddress = parsedResult.data;

    // check if the address with the same name already exists
    const existingAddress = await db
      .select()
      .from(addresses)
      .where(
        and(
          eq(addresses.user_id, user.id),
          eq(addresses.name, parsedAddress.name)
        )
      );

    if (existingAddress.length > 0) {
      return {
        message: "Address with the same name already exists",
        isError: true,
      };
    }

    //check if the MAX_ADDRESS_COUNT is reached
    const userAddresses = await db
      .select()
      .from(addresses)
      .where(eq(addresses.user_id, user.id));

    if (userAddresses.length >= MAX_ADDRESS_COUNT) {
      return {
        message: `You have reached the maximum number of addresses (${MAX_ADDRESS_COUNT})`,
        isError: true,
      };
    }

    const insertedAddress = await db
      .insert(addresses)
      .values(parsedAddress)
      .returning();

    if (!insertedAddress || insertedAddress.length === 0) {
      throw new Error("Failed to add address");
    }

    const addressId = insertedAddress[0].id;

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
    return {
      message: "Address added successfully",
      data: addressId,
      isError: false,
    };
  } catch (error) {
    console.error("Error adding address", error);
    return {
      message: "Something went wrong",
      isError: true,
    };
  }
}

export async function deleteAddressAction({
  addressId,
  pathToRevalidate,
}: {
  addressId: number;
  pathToRevalidate?: string;
}): Promise<ActionResponseWithIssues<void>> {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    // Check if address is related to commissions
    const relatedCommissions = await db
      .select()
      .from(commissions)
      .where(eq(commissions.address_id, addressId))
      .limit(1);

    if (relatedCommissions.length > 0) {
      return {
        message: "Address is related to commissions",
        isError: true,
      };
    }

    const deletedAddress = await db
      .delete(addresses)
      .where(and(eq(addresses.id, addressId), eq(addresses.user_id, user.id)))
      .returning();

    if (!deletedAddress[0]) {
      throw new Error("Failed to delete address");
    }

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }
    return {
      message: "Address deleted successfully",
      isError: false,
    };
  } catch (error) {
    console.error("Error deleting address", error);
    return {
      message: "Something went wrong",
      isError: true,
    };
  }
}

export async function updateAddressAction({
  address,
  pathToRevalidate,
}: {
  address: z.infer<typeof addressUpdateSchema>;
  pathToRevalidate?: string;
}): Promise<ActionResponseWithIssues<void>> {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    if (address.user_id !== user.id) {
      throw new Error("You are not authorized");
    }

    // Check if address is related to commissions
    const relatedCommissions = await db
      .select()
      .from(commissions)
      .where(eq(commissions.address_id, address.id))
      .limit(1);

    if (relatedCommissions.length > 0) {
      return {
        message: "Address is related to commissions",
        isError: true,
      };
    }

    const parsedResult = addressUpdateSchema.safeParse(address);
    if (!parsedResult.success) {
      console.error("Invalid input", parsedResult.error.issues);
      return {
        message: "Invalid input",
        isError: true,
        issues: parsedResult.error.issues,
      };
    }

    const parsedAddress = parsedResult.data;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...addressData } = parsedAddress;

    const updatedAddress = await db
      .update(addresses)
      .set(addressData)
      .where(eq(addresses.id, address.id))
      .returning();

    if (!updatedAddress[0]) {
      throw new Error("Failed to update address");
    }

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return {
      message: "Address updated successfully",
      isError: false,
    };
  } catch (error) {
    console.error("Error updating address", error);
    return {
      message: "Something went wrong",
      isError: true,
    };
  }
}

export async function addCommissionAction({
  commission,
  pathToRevalidate,
}: {
  commission: commissionFormSchemaType;
  pathToRevalidate?: string;
}): Promise<ActionResponseWithIssues<string>> {
  // if error happens, this will be used to delete the images and commission

  let images_names: string[] | null = null;
  let commission_id: number | null = null;
  let recurring_id: number | null = null;

  try {
    const session = getKindeServerSession();
    const roles = await session.getRoles();
    const isAdmin = Boolean(roles?.find((role) => role.name === "admin"));
    const user = await session.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    if (commission.user_id !== user.id && !isAdmin) {
      throw new Error("You are not authorized");
    }

    const parsedResult = commissionFormSchema.safeParse(commission);
    if (!parsedResult.success) {
      console.error("Invalid input", parsedResult.error.issues);
      return {
        message: "Invalid input",
        isError: true,
        issues: parsedResult.error.issues,
      };
    }

    const { recurrence, images_files, ...commissionData } = parsedResult.data;

    const newCommission: z.infer<typeof commissionInsertSchema> = {
      ...commissionData,
    };

    // return {
    //   message: "Commission added successfully",
    //   isError: false,
    // };

    if (images_files) {
      images_names = [];
      for (const image of images_files) {
        const imageName = generateImageName(image.type);
        const checksum = await computeSHA256(image);
        const signedUrl = await putSignedFileUrl({
          fileName: imageName,
          fileType: image.type,
          fileSize: image.size,
          checksum: checksum,
          expiresIn: 600,
        });
        await fetch(signedUrl, {
          method: "PUT",
          body: image,
        });
        images_names.push(imageName);
      }
    }
    newCommission.images_names = images_names;
    const insertedCommission = await db
      .insert(commissions)
      .values(newCommission)
      .returning();

    commission_id = insertedCommission[0].id;
    if (!insertedCommission || insertedCommission.length === 0) {
      throw new Error("Failed to add commission");
    }

    if (recurrence && commissionData.is_recurring) {
      const newReccurence: z.infer<typeof recurringInsertSchema> = {
        commission_id: insertedCommission[0].id,
        recurrence: recurrence,
        start_date: commissionData.start_date.toISOString(),
        start_time: commissionData.start_time,
        notes: commissionData.notes,
      };
      const recurrenceData = await db
        .insert(recurring)
        .values(newReccurence)
        .returning();

      if (!recurrenceData || recurrenceData.length === 0) {
        throw new Error("Failed to add recurrence");
      }
      recurring_id = recurrenceData[0].id;
    }
  } catch (error) {
    console.error("Error adding commission", error);

    if (images_names) {
      for (const imageName of images_names) {
        await deleteFile({ fileName: imageName });
      }
    }

    if (commission_id) {
      await db.delete(commissions).where(eq(commissions.id, commission_id));
    }

    if (recurring_id) {
      await db.delete(recurring).where(eq(recurring.id, recurring_id));
    }

    return {
      message: "Something went wrong",
      isError: true,
    };
  }

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
  }
  // In Server Actions and Route Handlers, redirect should be called after the try/catch block.
  redirect("/dashboard/commissions", RedirectType.replace);
}

// for insertion, if there is no company in the database
export async function addCompanyInfoAction({
  companyInfo,
  pathToRevalidate,
}: {
  companyInfo: z.infer<typeof companyInsertSchema>;
  pathToRevalidate?: string;
}): Promise<ActionResponseWithIssues<void>> {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    if (companyInfo.user_id !== user.id) {
      throw new Error("You are not authorized");
    }

    const parsedResult = companyInsertSchema.safeParse(companyInfo);

    if (!parsedResult.success) {
      console.error("Invalid input", parsedResult.error.issues);
      return {
        message: "Invalid input",
        isError: true,
        issues: parsedResult.error.issues,
      };
    }

    const companyInfoData = parsedResult.data;

    const insertedCompanyInfo = await db
      .insert(companies)
      .values(companyInfoData)
      .returning();

    if (!insertedCompanyInfo || insertedCompanyInfo.length === 0) {
      throw new Error("Failed to add company information");
    }

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return {
      message: "Company information added successfully",
      isError: false,
    };
  } catch (error) {
    console.error("Error adding company information", error);
    return {
      message: "Something went wrong",
      isError: true,
    };
  }
}

// for updating, if there is already a company in the database
export async function updateCompanyInfoAction({
  companyInfo,
  pathToRevalidate,
}: {
  companyInfo: z.infer<typeof companyInsertSchema>;
  pathToRevalidate?: string;
}): Promise<ActionResponseWithIssues<void>> {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    if (companyInfo.user_id !== user.id) {
      throw new Error("You are not authorized");
    }

    const parsedResult = companyInsertSchema.safeParse(companyInfo);
    if (!parsedResult.success) {
      console.error("Invalid input", parsedResult.error.issues);
      return {
        message: "Invalid input",
        isError: true,
        issues: parsedResult.error.issues,
      };
    }

    const companyInfoData = parsedResult.data;

    const updatedCompanyInfo = await db
      .update(companies)
      .set(companyInfoData)
      .where(eq(companies.user_id, user.id))
      .returning();

    if (!updatedCompanyInfo[0]) {
      throw new Error("Failed to update company information");
    }

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return {
      message: "Company information updated successfully",
      isError: false,
    };
  } catch (error) {
    console.error("Error updating company information", error);
    return {
      message: "Something went wrong",
      isError: true,
    };
  }
}
