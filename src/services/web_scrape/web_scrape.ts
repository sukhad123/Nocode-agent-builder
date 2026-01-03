{
  /** Web Scrape Service Outsourcing from Bubble lab */
}
//Levering Firecrawl for webscrape
import firecrawlClient from "@/lib/firecrawl";
export default async function fireCrawlscraper({url}:TProps) {
  const firecrawl = await firecrawlClient();
  return await firecrawl.crawlUrl(url, {
      limit: 50,
      scrapeOptions: {
        formats: ["markdown"],
      },
    });
}
//props
type TProps = {
    url:string

}
