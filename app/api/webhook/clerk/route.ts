import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Hàm xử lý webhook
async function handler(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  // Kiểm tra xem webhookSecret có tồn tại không
  if (!webhookSecret) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
    );
  }
  
  const headerPayload = await headers();
  // Lấy các header cần thiết để xác thực webhook
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Nếu thiếu headers cần thiết
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Lấy body của request
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Tạo đối tượng Webhook để verify signature
  const wh = new Webhook(webhookSecret as string);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Xử lý sự kiện user.created
  if (evt.type === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    try {
      console.log("Creating user with data:", {
        id,
        email: email_addresses[0].email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        // Bổ sung thêm imageUrl (có thể sai vì thiếu)
        imageUrl: image_url,
      });

      // Kiểm tra xem user đã tồn tại chưa
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email_addresses[0].email_address,
        },
      });

      if (existingUser) {
        console.log("User already exists:", existingUser);
        // Nếu user đã tồn tại, cập nhật thông tin
        await prisma.user.update({
          where: {
            email: email_addresses[0].email_address,
          },
          data: {
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            imageUrl: image_url,
            authProvider: "clerk",
            isActive: true,
            isInstructor: false,
          },
        });
        return new Response("User updated successfully", { status: 200 });
      }

      // Nếu user chưa tồn tại, tạo mới
      await prisma.user.create({
        data: {
          id: id,
          email: email_addresses[0].email_address,
          name: `${first_name || ""} ${last_name || ""}`.trim(),
          imageUrl: image_url,
          authProvider: "clerk",
          isActive: true,
          isInstructor: false,
        },
      });

      console.log("User created successfully");
      return new Response("User created successfully", { status: 200 });
    } catch (error) {
      console.error("Error handling user:", error);
      return new Response(`Error handling user: ${(error as Error).message}`, {
        status: 500,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
