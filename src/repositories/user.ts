/* The code snippet you provided is a TypeScript module that defines a function `getCurrentUser` in a
`userRepo` object. Here's a breakdown of what the code is doing: */
"use server";
import prismaClient from "@/db/config";
import { successResponse, errorResponse } from "@/utils/respones";

export async function getCurrentUser() {
  try {
    /** Demo user for now */
    const user = await prismaClient.uSER.findUnique({
      where: { email: "sukhadadhikari3@gmail.com" },
    });

    return user;
  } catch (error: unknown) {
    console.log(error);
  }
}

export async function createNewUser(userEmail: string) {
  //check the user if exists
  const user = await prismaClient.uSER.findUnique({
      where: { email:userEmail },
    });
    if(!user)
    {
      const user = await prismaClient.uSER.create({
        data: {
          email: userEmail,
        },
      });
      return successResponse("User created successfully");
    }
}
