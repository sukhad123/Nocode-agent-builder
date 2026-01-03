"use server"
{/** Node Service Implementation_Create*/}
import { updated_agent_repo } from "../../repositories/udpatedNode/node";
//service to create updated node
export default async function updatedNodeCreateAgent({openaiAPIKey, additionalContent, name, website_url}:TProps)
{
    const {create} = updated_agent_repo;
    return await create(openaiAPIKey, additionalContent, name, website_url);
}
//Service Props
type TProps = {
  openaiAPIKey: string;
  additionalContent: string;
  name: string;
  website_url: string;
};