import { NextRequest, NextResponse } from "next/server";
import fireCrawlscraper from "@/services/web_scrape/web_scrape";
import prismaClient from "@/db/config";
import { encrypt } from "@/utils/encrypt_decrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { websiteUrl, agentName } = body;

    if (!websiteUrl || !agentName) {
      return NextResponse.json(
        { success: false, error: "Missing websiteUrl or agentName" },
        { status: 400 }
      );
    }

    // Use environment variable for OpenAI API key (demo mode)
    const demoApiKey = process.env.OPENAI_API_KEY;
    if (!demoApiKey) {
      return NextResponse.json(
        { success: false, error: "Demo API key not configured" },
        { status: 500 }
      );
    }

    // Crawl the website
    const scrapedData = await fireCrawlscraper({ url: websiteUrl });

    // Find or create demo API key entry
    let apiKeyRecord = await prismaClient.aPIKEY.findFirst({
      where: { api_key_name: "DEMO_KEY" },
    });

    if (!apiKeyRecord) {
      apiKeyRecord = await prismaClient.aPIKEY.create({
        data: {
          api_key_name: "DEMO_KEY",
          api_key: encrypt(demoApiKey),
        },
      });
    }

    // Create the demo agent (without user association)
    const agent = await prismaClient.nONTECHNICALNODE.create({
      data: {
        name: agentName,
        website_url: websiteUrl,
        web_scrape_data: scrapedData || "",
        additional_info: "",
        apiKey: {
          connect: { id: apiKeyRecord.id },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: agent.id,
        name: agent.name,
        websiteUrl: agent.website_url,
        createdAt: agent.createdAt,
      },
    });
  } catch (error) {
    console.error("Demo agent creation error:", error);
    //Use my own structured logging
    return NextResponse.json(
      { success: false, error: "Failed to create agent" },
      { status: 500 }
    );
  }
}
