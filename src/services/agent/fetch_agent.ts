"use server";
{
  /**Fetch all agents for the signed up user */
}
import { getCurrentUser } from "@/repositories/user";
import { agentRepo } from "@/repositories/agent";
export async function fetchAllAgent() {
  //Step 1: Get current user
  //Step 2: Fetch all agents for that user
  const user = await getCurrentUser();
  if (!user) {
    return;
  }
  const agents = await agentRepo.fetchByUser(user.id);
  console.log(agents);
}
