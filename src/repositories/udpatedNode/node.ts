
{
  /** Node Repository Implementation */
}
import prismaClient from "@/db/config";
import { getCurrentUser } from "../user";
export const updated_agent_repo = {
  create,
  getById
};

//create new updated agent
async function create(
  openaiAPIKey: string,
  additionalContent: string,
  name: string,
  website_url: string,
  web_scrape_data: string
) {
  try {
   
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const api_key = await prismaClient.aPIKEY.findUnique({
      where: { api_key: openaiAPIKey },
    });
    if (!api_key) {
      throw new Error("API Key not found");
    }
    //updated node stored
    const updatedNode = await prismaClient.nONTECHNICALNODE.create({
      data: {
        additional_info: additionalContent,
        name: name,
        apiKey: {
          connect: { id: api_key.id },
        },
        website_url: website_url,
        user: {
          connect: { id: user.id },
        },
        web_scrape_data: web_scrape_data,
      },
    });
    console.log("Updated Node created:", updatedNode);
    return updatedNode;
  } catch (error) {
    console.log(error);
  }
}

async function getById(id: string) {
  try {
    const updatedNode = await prismaClient.nONTECHNICALNODE.findUnique({
      where: { id },
      include:{
        apiKey:true,
      }
    });
    console.log("Fetched Updated Node:", updatedNode);

    return updatedNode;
  } catch (error) {
    console.log(error);
  } 
}