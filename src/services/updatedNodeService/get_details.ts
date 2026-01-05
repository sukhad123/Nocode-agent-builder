"use server"
{/** Get Service Details */}
import { updated_agent_repo } from "@/repositories/udpatedNode/node";
export default async function getUpdatedNodeDetailsService({id}: {id:string}) 
  {
    
    /**Implement the get details service for updated node */
    return await updated_agent_repo.getById(id);
  }