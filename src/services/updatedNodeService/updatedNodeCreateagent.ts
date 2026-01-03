"use server"
{/** Node Service Implementation_Create*/}
import { updated_agent_repo } from "../../repositories/udpatedNode/node";
//service to create updated node
export default async function updatedNodeCreateAgent({openaiAPIKey, additionalContent, name}:TProps)
{
    const {create} = updated_agent_repo;
    return await create(openaiAPIKey, additionalContent, name);
}
//Service Props
type TProps = {
  openaiAPIKey: string;
  additionalContent: string;
  name: string;
};