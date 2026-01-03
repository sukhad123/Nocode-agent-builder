{/** Node Generation Parent Service    */}
import updatedNodeCreateAgent from "./updatedNodeCreateagent";
import fireCrawlscraper from "../web_scrape/web_scrape";
export default async function nodeGenerationParentService({openaiAPIKey, additionalContent, name, website_url}:TProps      ) {
    //Step 1: Create an updated node and store to db
    const updatedNode = await updatedNodeCreateAgent({openaiAPIKey, additionalContent, name, website_url});
    //Step 2: Crawl the site
    const scrapedData = await fireCrawlscraper({url: additionalContent});
    //Step 3: Crafting the final agent
}
type TProps = {
  openaiAPIKey: string;
  additionalContent: string;
  name: string;
 website_url: string;
};