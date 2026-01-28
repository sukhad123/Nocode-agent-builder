"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody, Input, Button, addToast } from "@heroui/react";

type Message = {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: Date;
};

type DemoAgent = {
  id: string;
  name: string;
  websiteUrl: string;
  createdAt: string;
};

type Props = {
  selectedAgent: DemoAgent | null;
};

export default function ChatSection({ selectedAgent }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Reset chat when agent changes
  useEffect(() => {
    if (selectedAgent) {
      setMessages([
        {
          id: "welcome",
          sender: "agent",
          text: `Hi! I'm ${selectedAgent.name}, trained on ${selectedAgent.websiteUrl.replace(/^https?:\/\//, "")}. How can I help you today?`,
          timestamp: new Date(),
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [selectedAgent?.id]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !selectedAgent || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgent.id,
          message: userMessage.text,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "agent",
            text: result.data || "I couldn't process that request.",
            timestamp: new Date(),
          },
        ]);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      addToast({
        title: "Message Failed",
        description: "Could not send message. Please try again.",
        color: "danger",
      });
      // Remove the failed user message
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      setInput(userMessage.text);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedAgent) {
    return (
      <section className="py-12 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-[#111]/60 border border-gray-800 backdrop-blur-sm">
            <CardBody className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                Select an Agent to Chat
              </h3>
              <p className="text-sm text-gray-500">
                Create an agent above, then click on it to start chatting
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="chat" className="py-12 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              {selectedAgent.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-white">{selectedAgent.name}</h2>
              <p className="text-xs text-gray-500">
                {selectedAgent.websiteUrl.replace(/^https?:\/\//, "")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Online
          </div>
        </div>

        <Card className="bg-[#0d0d0d] border border-gray-800 overflow-hidden">
          <CardBody className="p-0">
            {/* Messages area */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md"
                          : "bg-gray-800/80 text-gray-100 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                      <p
                        className={`text-[10px] mt-1 ${
                          message.sender === "user"
                            ? "text-blue-200/60"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800/80 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-[#0a0a0a] border-t border-gray-800">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  variant="bordered"
                  size="lg"
                  isDisabled={isLoading}
                  classNames={{
                    input: "text-white",
                    inputWrapper:
                      "bg-[#111] border-gray-700 hover:border-gray-600 focus-within:border-cyan-500",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button
                  color="primary"
                  size="lg"
                  isIconOnly
                  isLoading={isLoading}
                  onPress={handleSend}
                  isDisabled={!input.trim()}
                  className="px-6"
                >
                  {!isLoading && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Press Enter to send
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </section>
  );
}
