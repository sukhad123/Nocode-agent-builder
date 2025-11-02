import prismaClient from "@/db/config";
import { errorResponse, successResponse } from "@/utils/respones";
import { type TNode } from "@/types/nodes/node";
import { type TEdge } from "@/types/edge/edge";
import { getCurrentUser } from "./user";

export const agentRepo = {
  create,
  fetchByUser,
  fetchById
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

    return agent.id;
  } catch (error) {
    console.error("Error creating agent:", error);
    return errorResponse("Error while creating the agent");
  }
}
async function fetchByUser(user_id: string) {
  try {
    const agents = await prismaClient.aGENT.findMany({
      where: { userId: user_id },
      include: {
        nodes: {
          include: {
            opeaniNode: true,
          },
        },
        edges: true,
      },
    });
  } catch (error) {
    console.log(error);
    return errorResponse("Error on fetching all agents by user");
  }
}
async function fetchById(agent_id: string) {
  try {
    const agent = await prismaClient.aGENT.findUnique({
      where: { id: agent_id },
      include: {
        nodes: {
          include: {
           opeaniNode:{
            include:{
              apiKey:true}
            
           },
          },
        }
      },
    });
   return agent;
  } catch (error) {
    console.log(error);
    return errorResponse("Error on fetching agent by id");
  }
} 