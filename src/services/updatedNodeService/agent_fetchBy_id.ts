"use server"
{
  /**Fetch agent details by ID */
}
import { errorResponse, successResponse } from "@/utils/respones";
import { updated_agent_repo } from "@/repositories/udpatedNode/node";
export default async function agent_fetchBy_id(agentId: string) {
  try {
    //Step 1: Get agent details
    const res = await updated_agent_repo.getById(agentId);
    return successResponse(res);
  } catch (error) {
    return errorResponse("Error fetching agent by ID: " + error);
  }
}
