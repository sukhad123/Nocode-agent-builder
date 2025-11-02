"use client"
import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useParams } from 'next/navigation'
import { agentChatService } from "@/services/agent/chat/agent_chat";
 
interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

export default function SimpleChatbotMockup() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", text: "Hi — how can i help you." },
  ]);
  const params = useParams();
  console.log("Params:", params.id);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { id: Date.now(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    // Simulate assistant reply
    setTimeout(async () => {
     
      const res = await agentChatService(messages, String(params?.id ?? ""));
       const reply: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: res || "Sorry, I couldn't process that"
      };
      setMessages((prev) => [...prev, reply]);
      setSending(false);
    }, 700);
  }

  return (
<div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-100">
  <div className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 flex flex-col">
    {/* HEADER */}
    <div className="flex items-center gap-4 p-6 border-b border-gray-800">
      <div className="flex-none">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
          CM
        </div>
      </div>
      <div className="flex-1">
        </div>
      <div className="flex-none text-sm text-green-400">● Online</div>
    </div>

    {/* MESSAGES */}
    <div className="flex-1 h-[60vh] overflow-auto p-6 space-y-4 bg-gradient-to-b from-gray-900 to-gray-950">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[75%] px-4 py-2 rounded-xl shadow-md break-words whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-indigo-600 text-white rounded-br-none"
                : "bg-gray-800 text-gray-100 rounded-bl-none"
            }`}
          >
            <div className="text-sm">{msg.text}</div>
            <div className="text-[10px] text-gray-400 mt-1 text-right">{msg.role}</div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>

    {/* INPUT */}
    <form onSubmit={handleSend} className="p-4 border-t border-gray-800 bg-gray-900/60">
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
          aria-label="Message input"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending}
          className="rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium disabled:opacity-60 transition-colors"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
      
    </form>
  </div>
</div>

  );
}
