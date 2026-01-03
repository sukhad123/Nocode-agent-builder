import { type TAPIKEY } from "@/types/api_key/api_key";
import prismaClient from "@/db/config";
import { errorResponse, successResponse } from "@/utils/respones";
//create new api key
export const apirepo = {
  create,
  fetch_all_by_user,
  find_by_id,
};
async function create(apiKeyData: TAPIKEY) {
  try {
    const api_key = await prismaClient.aPIKEY.create({
      data: apiKeyData,
    });
    return api_key
  } catch (error) {
    //Log the error
    console.log(error);
    return errorResponse("Error on creating the new api key");
  }
}
async function fetch_all_by_user(user_id: string) {
  try {
    const api_keys = await prismaClient.aPIKEY.findMany({
      where: { userId: user_id },
    });
    return api_keys;
  } catch (error) {
    //Log the error
    console.log(error);
    return errorResponse("Error on creating the new api key");
  }
}
async function find_by_id(api_key_id: string) {
  console.log("api key", api_key_id);
  try {
    const api_key = await prismaClient.aPIKEY.findUnique({
      where: { api_key: api_key_id },
    });
    return api_key;
  } catch (error) {
    //log the error
    console.log(error);
    return errorResponse("Error on finding the api key by id");
  }
}
