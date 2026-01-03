"use server"
{
  /**Fire crawl */
}
import Firecrawl from "@mendable/firecrawl-js";

export default async function firecrawlClient() { 
const firecrawl_apikey = process.env.FIRECRAWL_API_KEY;
if (!firecrawl_apikey) {
    throw new Error("FIRECRAWL_API_KEY is not defined in environment variables");
}
  return new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
}   
