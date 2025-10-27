import prismaClient from "@/db/config";
import { errorResponse, successResponse } from "@/utils/respones";
//create new api key
export const opeaniRepo = {
  create,
};
async function create(systemParams: string, api_key_id: string) {
  try {
    // const api_key = await prismaClient.aPIKEY.create({
    //   data: apiKeyData,
    // });
    //return successResponse(api_key);
    const opeaniNode = await prismaClient.oPENAINODE.create({
      data: {
        system_params: systemParams,
        api_key_id: api_key_id,
        model: "gpt-4",
      },
    });
    return opeaniNode;
  } catch (error) {
    //Log the error
    console.log(error);
    return errorResponse("Error on creating the new api key");
  }
}
