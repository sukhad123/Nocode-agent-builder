"use client";
{
  /**Render all the available agents from database */
}
import agent_fetchAll_byUser from "@/services/updatedNodeService/agent_fetchAll_byUser";
import AgentCard from "./AgentCard";
import { useRef, useEffect, useState } from "react";
// Full Agent type (from your Prisma data)
 
type SimplifiedAgent = {
  id: string;
  name: string;
};

export default function Agents() {
  //TODO Fetch all agents fromdb
  const [simplifiedAgents, setSimplifiedAgents] = useState<SimplifiedAgent[]>([]);

  //Handle onClick for each agent
  const onClickAgent = (agentId: string) => {
    
    //TODO Navigate to agent detail page or load agent details
  }
 useEffect(() => {
  const fetchAgents = async () => {
    const data = await agent_fetchAll_byUser(); // full data from DB
    console.log("Fetched agents:", data.data);
    // Map only the fields you need
    const simplified: SimplifiedAgent[] = Array.isArray(data.data) ? data.data.map(agent => ({
      id: agent.id,
      name: agent.name,
    })) : [];
    setSimplifiedAgents(simplified);
   
  };

  fetchAgents();
}, []);

 
  return (
    <div className="m-22 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 p-4 gap-4 border-2 border-solid rounded-xl border-indigo-500/50 ">
      {simplifiedAgents.map((agent) => (
        <div onClick= {() => onClickAgent(agent.id)}key={agent.id} >
          <AgentCard name={agent.name} id = {agent.id} />
          {agent.name}
        </div>
      ))}
    </div>
  );
}
 