/* The code snippet you provided is a TypeScript module that defines a function `getCurrentUser` in a
`userRepo` object. Here's a breakdown of what the code is doing: */
"use server";
import prismaClient from "@/db/config";
import { successResponse, errorResponse } from "@/utils/respones";
import { currentUser } from '@clerk/nextjs/server'

export async function getCurrentUser() {
  //Retrieve the current user from Clerk
  const curr_user  = await currentUser();
  if(!curr_user)
  {
    return null;
  }
  try {
    /** Demo user for now */
    return await prismaClient.uSER.findUnique({
          where: { email: curr_user.emailAddresses[0]?.emailAddress},
        });
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
