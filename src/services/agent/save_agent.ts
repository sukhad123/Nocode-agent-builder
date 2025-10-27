"use server";
{
  /**Service to save an agent
    Steps To save an agent in db level
    Step 1. Save the Nodes
    Step 2. Save the Edges
    if systemparams and opeani key exists
    Step 3. Create opeani node if exists
    Step 4 creat agent table */
}

import { errorResponse } from "@/utils/respones";
import get_api_key_by_id from "../api_key/fetch_by_id";
import { type Node, type Edge } from "@xyflow/react";
import { opeaniRepo } from "@/repositories/opean_ainode";
import { TNode } from "@/types/nodes/node";
import { TEdge } from "@/types/edge/edge";
import { agentRepo } from "@/repositories/agent";
import { type TOpenAINode } from "@/types/opeani_node/openai_node";
type TPros = {
  openaiAPIKey: string;
  systemParams: string;
  agentName: string;
  nodes: Node[];
  edges: Edge[];
};
export default async function saveAgentService({
  openaiAPIKey,
  systemParams,
  agentName,
  nodes,
  edges,
}: TPros) {
  {
    /**Steps Required
        Step 1: Find openai api key
        Step 2: openai node
        Step 3: Node
        Step 4: Edge
        Step 5: Agent
        */
  }
  try {
    const nodesUpdated: TNode[] = [];
    const edgesUpdated: TEdge[] = [];
    edges.map((edge) => {
      const tempData: TEdge = {
        edge_id: edge.id,
        source: edge.source,
        target: edge.target,
      };
      edgesUpdated.push(tempData);
    });

    //Step 1: Fetch by id
    const api_key = await get_api_key_by_id(openaiAPIKey);
    if (!api_key || "success" in api_key) {
      return errorResponse("Error on service function, api key not found");
    }
    //Step 2: Create api node
    const opean_ainode: TOpenAINode = {
      model: "gpt-3.5-turbo",
      system_params: systemParams,
      api_key_id: api_key.id,
    };
    //Step 3: save node
    nodes.map((node) => {
      //save the node to db
      //store start node
      if (node.id === "start") {
        const data: TNode = {
          name_id: node.id,
          data_label:
            typeof node.data?.label === "string" ? node.data.label : "",
          type: node.type || "",
          position_x: node.position.x,
          position_y: node.position.y,
        };
        nodesUpdated.push(data);
        //save the node
      } else {
        //opeani node
        const data: TNode = {
          name_id: node.id,
          data_label:
            typeof node.data?.label === "string" ? node.data.label : "",
          type: node.type || "",
          position_x: node.position.x,
          position_y: node.position.y,
          opeaniNodeId: opean_ainode,
        };
        nodesUpdated.push(data);
      }
    });

    const agent = await agentRepo.create(agentName, nodesUpdated, edgesUpdated);
    return agent;
  } catch (error) {
    //log the error
    console.log(error);
    return errorResponse("Error on save_agent service function");
  }
}
