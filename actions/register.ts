"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from 'bcryptjs'
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  // Check if values validated
  if (!validatedFields.success)
    return {error: "Invalid inputs"};

  const { name, email, password } = validatedFields.data;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // get existing User
  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  });

  // Check if email is already in use
  if (existingUser)
    return {error: "Email already in use"};

  // Create User
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  // TODO: Send verification email

  return {success: "Email sent"};
};
