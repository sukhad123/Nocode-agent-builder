import prismaClient from "@/db/config";
import { errorResponse, successResponse } from "@/utils/respones";
import { TNode } from "@/types/nodes/node";
export const nodeRepo = {
  create,
};
async function create(data: TNode) {
  try {
    // const api_key = await prismaClient.aPIKEY.create({
    //   data: apiKeyData,
    // });
    //return successResponse(api_key);
    const opeaniNode = await prismaClient.nODE.create({
      data: data,
    });
    return opeaniNode;
  } catch (error) {
    //Log the error
    console.log(error);
    return errorResponse("Error on creating the new api key");
  }
}
