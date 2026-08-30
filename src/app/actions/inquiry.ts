"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .transform((value) => (value ? value : undefined)),
  message: z.string().trim().min(10, "Tell the agent a little more (at least 10 characters).").max(2000),
  listingId: z.string().trim().min(1),
  agentId: z.string().trim().min(1),
});

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};

export async function submitInquiry(_prevState: InquiryState, formData: FormData): Promise<InquiryState> {
  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const errors: InquiryState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "name" || field === "email" || field === "phone" || field === "message") {
        errors[field] ??= issue.message;
      }
    }
    return {
      status: "error",
      message: Object.keys(errors).length ? undefined : "Something looks off with that request. Please try again.",
      errors,
    };
  }

  const { listingId, agentId, ...inquiry } = parsed.data;

  const listing = await prisma.listing.findFirst({
    where: { id: listingId, agentId },
    select: { id: true },
  });

  if (!listing) {
    return { status: "error", message: "This listing is no longer available." };
  }

  await prisma.inquiry.create({ data: { ...inquiry, listingId, agentId } });

  return { status: "success", message: "Thanks — the agent will get back to you shortly." };
}
