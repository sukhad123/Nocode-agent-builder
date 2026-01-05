"use server";
{
  /** Node Generation Parent Service    */
}
import updatedNodeCreateAgent from "./updatedNodeCreateagent";
import fireCrawlscraper from "../web_scrape/web_scrape";
import { successResponse, errorResponse } from "@/utils/respones";
import { error } from "console";
import {decrypt} from "@/utils/encrypt_decrypt";
export default async function nodeGenerationParentService({
  openaiAPIKey,
  additionalContent,
  name,
  website_url,
}: TProps) {
  {
    /**Try catch-type safety */
  }
  try {
    //Step 1: Crawl the site
    const scrapedData = await fireCrawlscraper({ url: website_url });
    console.log("Scraped Data:", scrapedData);
  
    //Step 2: Create an updated node and store to db
    const updatedNode = await updatedNodeCreateAgent({
      openaiAPIKey,
      additionalContent,
      name,
      website_url,
      web_scrape_data: scrapedData,
    });
    return successResponse({
      data: updatedNode?.id ?? "",
      message: "Updated Node created successfully",
    });
  } catch (err) {
    return errorResponse(
      "Updated Node service generation failed at node_generation_parent"
    );
  }
}
type TProps = {
  openaiAPIKey: string;
  additionalContent: string;
  name: string;
  website_url: string;
};
