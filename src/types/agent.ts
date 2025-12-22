import type {Node, Edge} from "@xyflow/react";
{/**agent type */}
export type TAgent ={
    id:string,
    name:string,
    isDeployed:boolean
}


{/**agent context */}
export type TAgentContext = {
    agentName:string,
    systemParams:string,
    nodes:Node[],
    edges:Edge[]
}