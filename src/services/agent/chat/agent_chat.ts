"use server"
{/**This service is responsible for chat */}
{/**Steps
    Grab that agent api and system params and message will be there answer */}

import { agentRepo } from "@/repositories/agent";
import { OpenAI } from "openai";
import { decrypt } from "@/utils/encrypt_decrypt";
export async function agentChatService(message:Message[], agentId:string) 
  {
    console.log("message in service", message); 
    try{
        const agent = await agentRepo.fetchById(agentId);
        // Guard against null/other shapes so TypeScript knows agent has 'nodes'
        if (!agent) {
            console.error("Agent not found", agentId);
            return;
        }
        if (!("nodes" in agent) || !Array.isArray((agent as { nodes: unknown[] }).nodes)) {
            console.warn("Agent has no nodes or unexpected shape", agent);
            return;
        }
        const { nodes } = agent;
        console.log(nodes);
        const systemParamsNode = nodes.find((node) => node.type === "customNodeUI");
        const {opeaniNode} = systemParamsNode || {};
        console.log("Openai Node", opeaniNode);
        //these informaton shoul dbe gathered like asyncrhonougsly when the page load on background
        //grab those data;
        console.log("System Params Node", opeaniNode?.system_params);
        console.log("API KEY", opeaniNode?.apiKey?.api_key);
        //Call openai api here with message and system params
        //now create gpt chat
        //create client
        const client = new OpenAI({
  apiKey:decrypt(opeaniNode?.apiKey?.api_key || "") ,
});
   
    const response = await client.chat.completions.create({
      model: "gpt-4", // fast and cheap model
      messages: [
        { role: "system", content: opeaniNode?.system_params || "You are a helpful assistant." },
        { role: "user", content: message.map((msg) => `${msg.role}: ${msg.text}`).join("\n") },
      ],
    });
    const answer = response.choices[0].message.content;
    console.log("answer from openai", answer);
   return answer;

    }catch(error)
    {
        console.error("Error in agent chat service", error);
    }
    /**Steps
        Step 1: Fetch agent by id
        Step 2: Get system params and openai node
        Step 3: Call openai api with message and system params
        Step 4: return the response
        */
  }
  type Message = {
  id: number;
  role: "assistant" | "user"; 
  text: string;
};
