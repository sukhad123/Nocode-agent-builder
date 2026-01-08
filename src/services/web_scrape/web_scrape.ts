{
  /** Web Scrape Service Outsourcing from Bubble lab */
}
//Levering Firecrawl for webscrape
import firecrawlClient from "@/lib/firecrawl";
export default async function fireCrawlscraper({url}: TProps) {
  const firecrawl = await firecrawlClient();
  const res = await firecrawl.crawlUrl(url, {
    limit: 5,
    scrapeOptions: {
      formats: ["markdown"],
    },
  });
  console.log("Firecrawl response:", res);

// Safety check
  if (res.success && Array.isArray(res.data)) {
    // Combine all markdown entries into one string (if multiple)
    const fullMarkdown = res.data.map(item => item.markdown).join("\n\n");
    return fullMarkdown;
  }

  console.error("Scraping failed or returned no data:", res);
  return "";
  
}
//props
type TProps = {
    url:string

}
