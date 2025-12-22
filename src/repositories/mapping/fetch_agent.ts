{/**Map from prisma type agent to our type */}
import { TAgent } from "@/types/agent";
import type { AGENT } from "@prisma/client";
export function mapPrismaAgentToTAgent(prismaAgent: AGENT): TAgent {
  return {
    id: prismaAgent.id,
    name: prismaAgent.agent_name,
    isDeployed: prismaAgent.idDeploy??false,
  };
}   