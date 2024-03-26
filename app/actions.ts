"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { customAlphabet, urlAlphabet } from "nanoid";

const shortCode = customAlphabet(urlAlphabet, 5)();

export async function shortenUrl(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    long: z
      .string()
      .min(4, {
        message: "The URL must be at least 4 characters long",
      })
      .max(100, { message: "The URL must be at most 100 characters long" }),
  });

  const parse = schema.safeParse({
    long: formData.get("url"),
  });

  if (!parse.success) {
    return { message: parse.error.issues[0].message };
  }

  const data = parse.data;

  const newUrl = encodeURIComponent(data.long);

  try {
    await sql`
      INSERT INTO link (long, short)
      VALUES (${newUrl}, ${shortCode})
    `;

    revalidatePath("/");
    return { message: `Shortened url: ${shortCode}` };
  } catch (e) {
    return { message: "Failed to shorten url" };
  }
}

export async function deleteUrl(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    id: z.string().min(1),
    long: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    long: formData.get("url"),
  });

  try {
    await sql`
      DELETE FROM link
      WHERE long = ${data.long};
    `;

    revalidatePath("/");
    return { message: `Deleted link ${data.long}` };
  } catch (e) {
    return { message: "Failed to delete link" };
  }
}
