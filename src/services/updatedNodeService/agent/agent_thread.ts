import { createAgent } from "langchain";

// Type for the agent object returned by createAgent
export type AgentInstance = ReturnType<typeof createAgent>;

// Map keyed by agentId (or threadId), value is AgentInstance
export const agentStore = new Map<string, AgentInstance>();
