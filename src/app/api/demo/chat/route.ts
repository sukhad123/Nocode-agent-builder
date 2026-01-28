import { NextRequest, NextResponse } from "next/server";
import { getOrCreateAgent } from "@/services/updatedNodeService/agent/agent_build_init";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentId, message } = body;

    if (!agentId || !message) {
      return NextResponse.json(
        { success: false, error: "Missing agentId or message" },
        { status: 400 }
      );
    }

    const agent = await getOrCreateAgent(agentId);
    if (!agent) {
      return NextResponse.json(
        { success: false, error: "Agent not found" },
        { status: 404 }
      );
    }
    //thread memory lol
    const config = {
      configurable: { thread_id: agentId },
      context: { user_id: agentId },
    };

    const res = await agent.invoke(
      { messages: [{ role: "user", content: message }] },
      config
    );

    return NextResponse.json({
      success: true,
      data: res.messages.at(-1)?.content,
    });
  } catch (error) {
    console.error("Demo chat error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process message" },
      { status: 500 }
    );
  }
}
