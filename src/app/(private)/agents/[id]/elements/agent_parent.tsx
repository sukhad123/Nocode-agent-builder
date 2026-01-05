"use client";
{/** Agent Parent Component */}
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { buildAgentContext } from "@/services/updatedNodeService/backend_context/agent_build_agent_context";
;
import  Agent  from "@/services/updatedNodeService/agent/agent_build_init";
//TODO: Refined inupt
import React, { useState, useRef } from "react";
import { Card, Input, Button } from "@heroui/react";
export default function AgentParentComponent() {
  const params = useParams<{ id: string }>()
  //Retrieve the id from params
  const { id } = params;
  //Fetch the details
  useEffect(() => {
// sourcery skip: avoid-function-declarations-in-blocks
//TODO: Cache the details to avoid multiple calls for the same id
    async function fetchDetails() {
      const  res = await buildAgentContext(id);
    }
    fetchDetails();
  }, []);

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
    const res = await Agent({agentId:id, message:input});

    // Fake agent reply (replace with your AI call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: String(res || "") },
      ]); 
    }, 500);
  };
  
  return(<>
  <div className="flex flex-col h-screen max-w-md mx-auto p-4">
      {/* Chat feed */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto border p-2 rounded-md bg-gray-50">
        {messages.map((msg, idx) => (
          <Card
            key={idx}
            className={`max-w-xs break-words p-2 ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
             {msg.text} 
          </Card>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input box */}
      <div className="flex gap-2 mt-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  </>);
}