{/**Agent Context to reuse backend call */}
import getUpdatedNodeDetailsService from "../get_details";
import {errorResponse, successResponse} from "@/utils/respones";
export async function buildAgentContext(agentId: string) {
  // Fetch agent once per request
  try{
  const agent = await getUpdatedNodeDetailsService({ id: agentId });
  if (!agent) throw new Error("Agent not found");

 return agent;
}
catch(error)
{
    return ""
}
}