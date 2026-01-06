"use server"
{
  /**Delete agent service */
}
import { updated_agent_repo } from "@/repositories/udpatedNode/node";
import { successResponse, errorResponse } from "@/utils/respones";
export default async function agent_deleteBy_id(agentId: string) {
  try {
    await updated_agent_repo.deleteById(agentId);
    return successResponse("Agent deleted successfully");
  } catch (error) {
    return errorResponse("Error deleting agent: " + error);
  }
}
