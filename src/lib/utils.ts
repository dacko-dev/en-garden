import { ActionResponseWithIssues } from "@/types";
import { recurrenceSchema } from "@/db/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstWord(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function makePlural(str: string | null | undefined) {
  if (!str) return "";
  return str.endsWith("s") ? str : str + "s";
}

export function getErrorMessage(
  error: unknown,
  fallbackMsg = "Unknown error"
): string {
  return error instanceof Error
    ? error.message
    : fallbackMsg || "Unknown error";
}

export function zodIssuesResponse<T>({
  issues,
  message,
  data,
}: {
  issues: z.ZodIssue[];
  message?: string;
  data?: T;
}) {
  const body: ActionResponseWithIssues<T> = {
    message: message ?? "Validation failed",
    issues,
    isError: true,
    data,
  };

  return new Response(JSON.stringify(body), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function generateImageName(fileType: File["type"]) {
  const fileExtension = fileType.split("/")[1];
  return `${crypto.randomUUID()}.${fileExtension}`;
}

export async function computeSHA256(file: File) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export function recurrenceToSingular({
  recurrence,
  capitalize,
}: {
  recurrence: z.infer<typeof recurrenceSchema> | null | undefined;
  capitalize?: boolean;
}) {
  if (!recurrence) return null;
  switch (recurrence) {
    case "daily":
      return capitalize ? "Day" : "day";
    case "weekly":
      return capitalize ? "Week" : "week";
    case "monthly":
      return capitalize ? "Month" : "month";
  }
}

export function cleanDefaultValues<T extends Record<string, unknown>>(
  data: T
): T {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value ?? ""])
  ) as T;
}
