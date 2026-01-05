"use server"
import { getOrCreateAgent } from "./agent_build_init";
export default async function processagentmessageServerfunction(agentId: string, message: string) {
  const agent = await getOrCreateAgent(agentId);

  const config = {
    configurable: { thread_id: agentId }, // reuse agentId as thread_id
    context: { user_id: agentId },
  };

  const res = await agent.invoke(
    { messages: [{ role: "user", content: message }] },
    config
  );

  return res.messages.at(-1)?.content;
}
