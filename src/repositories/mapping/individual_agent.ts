{/**Individual agent mappping */}
import type { TAgentContext } from "@/types/agent";
import type { AGENT } from "@prisma/client";
export function mapPrismaIndividualAgentToTAgent(
  prismaAgent: AGENT & { nodes?: { systemParams?: string }[]; edges?: unknown[] }
): TAgentContext {
  return {
    agentName: prismaAgent.agent_name,
    systemParams: prismaAgent.nodes?.[0]?.systemParams ?? "", // safe default
  //TODO: Need to fix
    nodes: [],               // safe default empty array
    edges: [],
  };
}