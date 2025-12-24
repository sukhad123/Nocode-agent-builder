"use client";

import { Button, Card, CardBody, CardHeader, User } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserButton } from '@clerk/nextjs'

export default function Dashboard() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          shadow="lg"
          className="bg-[#111] border border-gray-800 w-[350px] p-6 rounded-2xl"
        >
          <CardHeader className="flex flex-col items-center gap-2 pb-4">
            <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
            <p className="text-sm text-gray-400 text-center">
              Manage your agents with ease
            </p>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <Button
              color="primary"
              size="lg"
              variant="shadow"
              className="rounded-xl font-medium"
              onPress={() => router.push("/newagent")}
            >
              Create New Agent
            </Button>
                  <UserButton  afterSignOutUrl="/" />

            <Button
              color="secondary"
              size="lg"
              variant="shadow"
              className="rounded-xl font-medium"
              onPress={() => router.push("/agents")}
            >
              View Agents
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    </main>
  );
}
