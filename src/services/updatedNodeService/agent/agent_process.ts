"use server";
import { getOrCreateAgent } from "./agent_build_init";
import { successResponse, errorResponse } from "@/utils/respones";
export default async function processagentmessageServerfunction(
  agentId: string,
  message: string
) {
  try {
    const agent = await getOrCreateAgent(agentId);
    if (!agent) throw new Error("Agent not found");

    const config = {
      configurable: { thread_id: agentId }, // reuse agentId as thread_id
      context: { user_id: agentId },
    };

    const res = await agent.invoke(
      { messages: [{ role: "user", content: message }] },
      config
    );

    return successResponse(res.messages.at(-1)?.content);
  } catch (error) {
    return errorResponse("Error processing agent message " + error);
  }
}
