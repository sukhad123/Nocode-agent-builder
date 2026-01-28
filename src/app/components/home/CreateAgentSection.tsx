"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  addToast,
} from "@heroui/react";

type DemoAgent = {
  id: string;
  name: string;
  websiteUrl: string;
  createdAt: string;
};

type Props = {
  onAgentCreated: (agent: DemoAgent) => void;
};

export default function CreateAgentSection({ onAgentCreated }: Props) {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [agentName, setAgentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleCreateClick = () => {
    if (!websiteUrl.trim()) {
      addToast({
        title: "Website URL Required",
        description: "Please enter a website URL to create your agent",
        color: "warning",
      });
      return;
    }

    if (!isValidUrl(websiteUrl)) {
      addToast({
        title: "Invalid URL",
        description: "Please enter a valid website URL (e.g., https://example.com)",
        color: "danger",
      });
      return;
    }

    onOpen();
  };

  const handleCreate = async () => {
    if (!agentName.trim()) {
      addToast({
        title: "Agent Name Required",
        description: "Please give your agent a name",
        color: "warning",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/demo/create-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteUrl: websiteUrl.trim(),
          agentName: agentName.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        addToast({
          title: "Agent Created!",
          description: `${agentName} is ready to chat`,
          color: "success",
        });

        onAgentCreated(result.data);
        setWebsiteUrl("");
        setAgentName("");
        onClose();
      } else {
        throw new Error(result.error || "Failed to create agent");
      }
    } catch (error) {
      addToast({
        title: "Creation Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="create-agent" className="py-16 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="  ">
              Create Your AI Agent
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Paste any website URL and we will train an AI agent on its content
          </p>
        </div>

        <Card className="bg-[#111]/80 border border-gray-800 backdrop-blur-md">
          <CardBody className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://your-website.com"
                variant="bordered"
                size="lg"
                classNames={{
                  input: "text-white",
                  inputWrapper: "bg-[#0a0a0a] border-gray-700 hover:border-gray-600",
                }}
                startContent={
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                }
              />
              <Button
                color="primary"
                size="lg"
                onPress={handleCreateClick}
              >
                Create Agent
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant creation
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure & private
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Free to try
              </span>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Name Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: "bg-[#111] border border-gray-800",
          header: "border-b border-gray-800",
          footer: "border-t border-gray-800",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="">Name Your Agent</span>
                <span className="text-xs text-gray-400 font-normal">
                  Give your AI agent a memorable name
                </span>
              </ModalHeader>
              <ModalBody className="py-6">
                <Input
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g., Support Bot, Sales Assistant..."
                  variant="bordered"
                  autoFocus
                  classNames={{
                    input: "text-white",
                    inputWrapper: "bg-[#0a0a0a] border-gray-700",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && agentName.trim()) {
                      handleCreate();
                    }
                  }}
                />
                <p className="">
                  Training on: <span className="text-cyan-400">{websiteUrl}</span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose} className="text-gray-400">
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleCreate}
                  isLoading={isLoading}
                  isDisabled={!agentName.trim()}
                >
                  {isLoading ? "Creating..." : "Create Agent"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
