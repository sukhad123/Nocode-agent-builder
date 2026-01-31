"use client";

import { useState } from "react";
import CreateAgentSection from "./CreateAgentSection";
import ChatSection from "./ChatSection";

type DemoAgent = {
  id: string;
  name: string;
  websiteUrl: string;
  createdAt: string;
};

export default function HomeClientWrapper() {
  const [agents, setAgents] = useState<DemoAgent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const handleAgentCreated = (agent: DemoAgent) => {
    setAgents((prev) => [agent, ...prev]);
    setSelectedAgentId(agent.id);

    setTimeout(() => {
      document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || null;

  return (
    <>
      <CreateAgentSection onAgentCreated={handleAgentCreated} />
      <ChatSection selectedAgent={selectedAgent} />
    </>
  );
}
