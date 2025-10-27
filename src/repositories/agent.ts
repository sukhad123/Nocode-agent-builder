import prismaClient from "@/db/config";
import { errorResponse, successResponse } from "@/utils/respones";
import { type TNode } from "@/types/nodes/node";
import { type TEdge } from "@/types/edge/edge";
import { getCurrentUser } from "./user";

export const agentRepo = {
  create,
};

async function create(agentName: string, nodes: TNode[], edges: TEdge[]) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return errorResponse("User not found");
    }

    const agent = await prismaClient.aGENT.create({
      data: {
        userId: user.id,
        agent_name: agentName,

        nodes: {
          create: nodes.map((n: TNode) => {
            const { opeaniNodeId, ...rest } = n;
            return opeaniNodeId
              ? {
                  ...rest,
                  opeaniNode: {
                    create: opeaniNodeId, // create a brand new OpenAI node
                  },
                }
              : rest; // no OpenAI node, just the node itself
          }),
        },

        edges: {
          create: edges,
        },
      },
      include: {
        nodes: true,
        edges: true,
      },
    });

    return successResponse(agent, "Agent created successfully!");
  } catch (error) {
    console.error("Error creating agent:", error);
    return errorResponse("Error while creating the agent");
  }
}
