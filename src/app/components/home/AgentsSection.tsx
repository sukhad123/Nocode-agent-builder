"use client";

import { motion } from "framer-motion";
import { Card, CardBody, Button } from "@heroui/react";

type DemoAgent = {
  id: string;
  name: string;
  websiteUrl: string;
  createdAt: string;
};

type Props = {
  agents: DemoAgent[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string) => void;
  onDeleteAgent: (agentId: string) => void;
};

export default function AgentsSection({
  agents,
  selectedAgentId,
  onSelectAgent,
  onDeleteAgent,
}: Props) {
  if (agents.length === 0) {
    return (
      <section className="py-12 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="py-16 border border-dashed border-gray-700 rounded-2xl bg-[#0a0a0a]/50">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">No agents yet</h3>
            <p className="text-sm text-gray-500">
              Create your first AI agent above to get started
            </p>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Your Agents{" "}
            <span className="text-sm font-normal text-gray-500">
              ({agents.length})
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                isPressable
                onPress={() => onSelectAgent(agent.id)}
                className={`bg-[#111] border transition-all duration-200 ${
                  selectedAgentId === agent.id
                    ? "border-cyan-500/70 shadow-lg shadow-cyan-500/10"
                    : "border-gray-800 hover:border-gray-700"
                }`}
              >
                <CardBody className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                          selectedAgentId === agent.id
                            ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                            : "bg-gradient-to-br from-gray-700 to-gray-800"
                        }`}
                      >
                        {agent.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {agent.name}
                        </h3>
                        <p className="text-xs text-gray-500 truncate max-w-[150px]">
                          {agent.websiteUrl.replace(/^https?:\/\//, "")}
                        </p>
                      </div>
                    </div>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-gray-500 hover:text-red-400"
                      onPress={(e) => {
                       // e.stopPropagation();
                        onDeleteAgent(agent.id);
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </Button>
                  </div>

                  {selectedAgentId === agent.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-gray-800"
                    >
                      <div className="flex items-center gap-2 text-xs text-cyan-400">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Active - Chat below
                      </div>
                    </motion.div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
