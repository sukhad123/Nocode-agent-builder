"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, addToast } from "@heroui/react";
import HeroSection from "./components/home/HeroSection";
import CreateAgentSection from "./components/home/CreateAgentSection";
import AgentsSection from "./components/home/AgentsSection";
import ChatSection from "./components/home/ChatSection";

type DemoAgent = {
  id: string;
  name: string;
  websiteUrl: string;
  createdAt: string;
};

const STORAGE_KEY = "demo_agents";

export default function Home() {
  const [agents, setAgents] = useState<DemoAgent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load agents from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAgents(parsed);
        if (parsed.length > 0) {
          setSelectedAgentId(parsed[0].id);
        }
      } catch (e) {
        console.error("Failed to parse stored agents:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save agents to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
    }
  }, [agents, isLoaded]);

  const handleAgentCreated = (agent: DemoAgent) => {
    setAgents((prev) => [agent, ...prev]);
    setSelectedAgentId(agent.id);

    // Scroll to chat section
    setTimeout(() => {
      document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== agentId));
    if (selectedAgentId === agentId) {
      const remaining = agents.filter((a) => a.id !== agentId);
      setSelectedAgentId(remaining.length > 0 ? remaining[0].id : null);
    }
    addToast({
      title: "Agent Deleted",
      description: "The agent has been removed",
      color: "default",
    });
  };

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || null;

  return (
    <main className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#000] text-white">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] top-[-400px] left-[-400px] blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)] bottom-[-300px] right-[-300px] blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_70%)] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 blur-[100px]"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800/50"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="font-semibold text-white">No Code Agent Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="light"
              size="sm"
              className="text-gray-400 hover:text-white"
              onPress={() => (window.location.href = "/signin")}
            >
              Sign In
            </Button>
            <Button
              color="primary"
              size="sm"
              className="font-medium"
              onPress={() => (window.location.href = "/signup")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="relative z-10 pt-16">
        {/* Hero */}
        <HeroSection />

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-[80%] max-w-3xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        />

        {/* Create Agent Section */}
        <CreateAgentSection onAgentCreated={handleAgentCreated} />

        {/* Agents Section */}
        <AgentsSection
          agents={agents}
          selectedAgentId={selectedAgentId}
          onSelectAgent={setSelectedAgentId}
          onDeleteAgent={handleDeleteAgent}
        />

        {/* Chat Section */}
        <ChatSection selectedAgent={selectedAgent} />

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-20 px-4 md:px-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to build more powerful agents?
            </h2>
            <p className="text-gray-400 mb-8">
              Sign up for free to save your agents, access advanced features, and
              connect your own API keys.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                color="primary"
                size="lg"
                className="font-semibold px-8"
                onPress={() => (window.location.href = "/signup")}
              >
                Create Free Account
              </Button>
              <Button
                variant="bordered"
                size="lg"
                className="font-semibold px-8 border-gray-700 text-gray-300 hover:border-gray-600"
                onPress={() => (window.location.href = "/signin")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              No Code Agent Builder {new Date().getFullYear()} - The Future Codes
              Itself
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
