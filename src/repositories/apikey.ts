
import { type TAPIKEY } from "@/types/api_key/api_key";
import prismaClient from "@/db/config";
import { errorResponse, successResponse } from "@/utils/respones";
//create new api key
export const apirepo = {
  create,
};
async function create(apiKeyData: TAPIKEY) {
  try {
    const api_key = await prismaClient.aPIKEY.create({
      data: apiKeyData,
    });
    return successResponse(api_key);
  } catch (error) {
    //Log the error
    console.log(error);
    return errorResponse("Error on creating the new api key");
  }
}
