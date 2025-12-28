"use server";
{
  /**Fetch all agents for the signed up user */
}
import { getCurrentUser } from "@/repositories/user";
import { agentRepo } from "@/repositories/agent";
export async function fetchAllAgent() {
  //Step 1: Get current user
  //Step 2: Fetch all agents for that user
  try {
    const user = await getCurrentUser();
    if (!user) {
      return;
    }
    const agents = await agentRepo.fetchByUser(user.id);
    console.log;
    return agents;
  } catch (error) {
    console.error("Error in fetch all agents service", error);
  }
}
{
  /** Fetch agent by ID */
}
export async function fetchAgentById(agentId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return;
    }
    return await agentRepo.fetchById(agentId);
  } catch (error) {
    console.error("Error in fetch agent by ID service", error);
  }
}
