"use server";
import { getCurrentUserService } from "../user/get_current_user";
import { errorResponse, successResponse } from "@/utils/respones";
import { apirepo } from "@/repositories/apikey";
export default async function fetchALLAPIKEYS() {
  try {
    const user = await getCurrentUserService();
    //Step 2: Hash user api key
    if (!user) {
      return errorResponse();
    }
    const apiKeys = await apirepo.fetch_all_by_user(user.id);

    return apiKeys;
  } catch (error) {
    return errorResponse();
  }
}
