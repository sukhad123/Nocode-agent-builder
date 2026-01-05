"use client";
{/** Agent Parent Component */}
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { buildAgentContext } from "@/services/updatedNodeService/backend_context/agent_build_agent_context";
;
import processagentmessageServerfunction from "@/services/updatedNodeService/agent/agent_process";
//TODO: Refined inupt
import React, { useState, useRef } from "react";
import { Card, CardBody,Input, Button } from "@heroui/react";
export default function AgentParentComponent() {
  const params = useParams<{ id: string }>()
  //Retrieve the id from params
  const { id } = params;
  

  //TODO: TO be refined
  type Message = {
  sender: "user" | "agent";
  text: string;
};
   const [messages, setMessages] = useState<Message[]>([
    { sender: "agent", text: "Hello! How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    const res = await processagentmessageServerfunction(id, input);

    // Fake agent reply (replace with your AI call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: String(res || "") },
      ]); 
    }, 500);
  };
  
  return(<>
 <div className="flex flex-col max-w-md mx-auto p-4 bg-[#121212] text-white">
      {/* Chat feed */}
      <div className="flex-1 flex flex-col gap-3 p-3 rounded-xl bg-gradient-to-b from-[#1F1F1F]/70 via-[#1A1A1A]/50 to-[#121212]/90 shadow-xl overflow-y-auto backdrop-blur-sm border border-[#333] overflow-x-auto ">
        {messages.map((msg, idx) => (
          <Card
            key={idx}
            className={`max-w-xs break-words p-1 rounded-xl ${
              msg.sender === "user"
                ? "bg-blue-600/70 text-white self-end backdrop-blur-md shadow-lg"
                : "bg-gray-700/60 text-white self-start backdrop-blur-md shadow-md"
            } transition-all duration-200 hover:scale-105`}
          >
            <CardBody className="whitespace-pre-wrap">{msg.text}</CardBody>
          </Card>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input box */}
      <div className="flex gap-2 mt-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          
        />
        <Button
          onPress={handleSend}
          color="primary"
        >
          Send
        </Button>
      </div>
    </div>
  </>);
}