import { LoginSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedFields = LoginSchema.safeParse(body);

  if (!validatedFields.success)
    return NextResponse.json({error: "Invalid inputs"}, {status: 400});
    // return NextResponse.json(validatedFields.error?.issues, {status: 400});

  return NextResponse.json({success: "Email sent"}, {status: 201});
}