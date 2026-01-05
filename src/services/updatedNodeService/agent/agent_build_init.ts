import { v4 as uuidv4 } from "uuid";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { buildAgentContext } from "../backend_context/agent_build_agent_context";
import { decrypt } from "@/utils/encrypt_decrypt";
import { createAgent } from "langchain";
import { agentStore } from "./agent_thread";

export async function getOrCreateAgent(agentId: string) {
  // check if agent already exists
  if (agentStore.has(agentId)) {
    return agentStore.get(agentId);
  }

  const res = await buildAgentContext(agentId);
  if (!res) throw new Error("Agent not found");

  const agent_info = res;
  const web_scrape_data = agent_info?.web_scrape_data ?? "- No data available";

  // system prompt
  const systemPrompt = `
You are a conversational assistant for this business.

Business Data:
${web_scrape_data}

Your task:
- Use the provided business data to answer questions accurately.
- If you do NOT know the answer from the data, politely say you don’t know.
- Keep answers concise, clear, and professional.
- Use conversation history to maintain context during this chat.
- Remember details the user provides during this conversation.

Rules:
- Ask clarifying questions only if necessary.
- Do not repeat information the user already knows.
- Respond naturally and helpfully.
`;

  const llm = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0,
    apiKey: decrypt(agent_info.apiKey?.api_key ?? ""),
  });

  const checkpointer = new MemorySaver();

  const agent = createAgent({
    model: llm,
    systemPrompt,
    checkpointer,
  });

  // store in memory
  agentStore.set(agentId, agent);
  return agent;
}
