// app/page.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#000] text-white">
      {/* Floating gradient glows */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 2 }}
          className="absolute w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_70%)] top-[-300px] left-[-300px] blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2),transparent_70%)] bottom-[-250px] right-[-300px] blur-[140px]"
        />
      </div>

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Build Smarter Agents
          </span>
          <br />
          <span className="text-gray-400 font-light">No Code. Pure Logic.</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg md:text-xl leading-relaxed">
          A dark, intelligent canvas where you design, train, and connect AI nodes —
          from concept to creation. It’s not just code — it’s collaboration with intelligence.
        </p>

        <Button
          size="lg"
          radius="full"
       color="primary"
       className = "shadow-lg"
          onPress={() => (window.location.href = "/signup")}
        >
          Get Started
        </Button>
      </motion.div>

      {/* Glass effect divider */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      {/* Sub-text or tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute bottom-20 text-gray-500 text-sm tracking-wide"
      >
        Node Agent Builder © {new Date().getFullYear()} — The Future Codes Itself
      </motion.p>
    </main>
  );
}
