import { getCurrentUser, createNewUser } from "../../repositories/user";
export async function getCurrentUserService() {
  return await getCurrentUser();
}
{/**Create or upsert new user */}
export async function createOrUpsertUserService(userEmail: string) {
  return await createNewUser(userEmail);
}