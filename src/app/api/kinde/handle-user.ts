import { db } from "@/db/export";
import { users } from "@/db/schema";
import { getErrorMessage } from "@/lib/utils";
import { decodeWebhook } from "@kinde/webhooks";
import { WebhookEventType } from "@kinde/webhooks/dist/types";
import { eq } from "drizzle-orm";

// https://github.com/kinde-oss/webhook
export async function POST(request: Request) {
  try {
    const payloadText = await request.text();
    // Process the webhook payload

    const decodedWebhook = await decodeWebhook(payloadText);
    if (decodedWebhook === null) {
      return new Response(`Webhook decoded payload is null`, {
        status: 400,
      });
    }

    if (decodedWebhook.type === WebhookEventType.userCreated) {
      try {
        db.insert(users).values({
          id: decodedWebhook.data.user.id,
          email: decodedWebhook.data.user.email,
          first_name: decodedWebhook.data.user.first_name,
          last_name: decodedWebhook.data.user.last_name,
          phone: decodedWebhook.data.user.phone,
          active: true,
        });
      } catch (error) {
        return new Response(
          `Webhook insert user error: ${getErrorMessage(error)}`,
          {
            status: 400,
          }
        );
      }
    }

    if (decodedWebhook.type === WebhookEventType.userUpdated) {
      try {
        db.update(users)
          .set({
            email: decodedWebhook.data.user.email,
            first_name: decodedWebhook.data.user.first_name,
            last_name: decodedWebhook.data.user.last_name,
            phone: decodedWebhook.data.user.phone,
          })
          .where(eq(users.id, decodedWebhook.data.user.id));
      } catch (error) {
        return new Response(
          `Webhook update user error: ${getErrorMessage(error)}`,
          {
            status: 400,
          }
        );
      }
    }

    if (decodedWebhook.type === WebhookEventType.userDeleted) {
      try {
        db.delete(users).where(eq(users.id, decodedWebhook.data.user.id));
      } catch (error) {
        return new Response(
          `Webhook delete user error: ${getErrorMessage(error)}`,
          {
            status: 400,
          }
        );
      }
    }
  } catch (error) {
    return new Response(`Webhook error: ${getErrorMessage(error)}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
