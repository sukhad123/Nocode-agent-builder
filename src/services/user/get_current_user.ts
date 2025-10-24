import { getCurrentUser } from "../../repositories/user";
export async function getCurrentUserService() {
  return await getCurrentUser();
}
