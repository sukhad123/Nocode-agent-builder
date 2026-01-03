{
  /**Fire crawl */
}
import Firecrawl from "@mendable/firecrawl-js";

export default async function firecrawlClient() {
  return new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
}   
