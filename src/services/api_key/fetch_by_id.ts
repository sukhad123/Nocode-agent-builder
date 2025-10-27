"use server";
import { apirepo } from "@/repositories/apikey";
export default async function get_api_key_by_id(api_key: string) {
  return await apirepo.find_by_id(api_key);
}
