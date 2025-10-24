"use server"
import { TAPIKEY } from "@/types/api_key/api_key";
import { getCurrentUserService } from "../user/get_current_user";
import { apirepo } from "@/repositories/apikey";
import { successResponse, errorResponse } from "@/utils/respones";
export default async function createNewAPIKEY({
  api_key_name,
  api_key,
}: TPROPS) {
  //Step 1: Get Current logged in user
  try {
    const user = await getCurrentUserService();
    if(!user)
    {
        return
    }
    const data: TAPIKEY = {
      api_key_name: api_key_name,
      api_key: api_key,
      userId: user.id!
    };
    const new_api_key = apirepo.create(data);
    return successResponse(new_api_key);
  } catch (error) {
    console.log(error);
    return errorResponse("Error on creating new api key service");
  }
  //Step 2: Store for that user
}
type TPROPS = {
  api_key_name: string;
  api_key: string;
};
