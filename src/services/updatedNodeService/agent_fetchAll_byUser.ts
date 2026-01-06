"use server"
{/**Fetch all user agents */}
import { getCurrentUser } from "@/repositories/user";
import { successResponse, errorResponse } from "@/utils/respones";
import { updated_agent_repo } from "@/repositories/udpatedNode/node";
export default async function agent_fetchAll_byUser() {
  try {
    //Step 1: Get current user  
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse("User not found");
    }
    //Step 2: Fetch all agents for that user
    const agents = await updated_agent_repo.getAllByUserId(user.id);
    return successResponse(agents);
  }
  catch(err)
  {
    return errorResponse("Error fetching agents: " + err);
  }
}