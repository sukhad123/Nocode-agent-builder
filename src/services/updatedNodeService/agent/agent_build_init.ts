"use server"
{/**Leverage Langchain to init LLM */}
//Things that my Langchain required
import { v4 as uuidv4 } from "uuid";
import { ChatOpenAI } from "@langchain/openai"
import { MemorySaver } from "@langchain/langgraph";
import { createAgent } from "langchain";
import { buildAgentContext } from "../backend_context/agent_build_agent_context";
import { decrypt } from "@/utils/encrypt_decrypt";
export default async function Agent({agentId, message}: {agentId:string, message:string}) {
  //Memory intialization
  const checkpointer = new MemorySaver();
  const res = await buildAgentContext(agentId);
  if(!res)
  {
    throw new Error("Agent not found");
  }
  const agent_info = res;
  //scrapped data
  const web_scrape_data = agent_info?.web_scrape_data ?? null;
 
 
// Generate system prompt for the business agent
const systemPrompt = `
You are a conversational assistant for this business.

Business Data:
${web_scrape_data ? web_scrape_data : "- No data available"}

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
  apiKey:decrypt(agent_info.apiKey?.api_key ?? ""),
  // other params...
})

const config = {
  configurable: { thread_id: uuidv4() },
  context: { user_id: uuidv4() },
}; 
 
const agent = createAgent({
    model:llm,
    systemPrompt: systemPrompt,
    checkpointer,
  })

  //this is a call
  const r1 = await agent.invoke(
    { messages: [{ role: "user", content: message }] },
    config
  )
  console.log(r1.messages.at(-1)?.content)
  return r1.messages.at(-1)?.content;

} 