"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] overflow-hidden">
      {/* Floating gradient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
          <span className="font-gray ">
            Build Smarter Agents
          </span>
          <br />
          <span className="text-gray-400 font-light text-3xl md:text-4xl lg:text-5xl">
            No Code. Pure Logic.
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-base md:text-lg leading-relaxed">
          Transform any website into an intelligent AI agent in seconds.
          <br className="hidden md:block" />
          Just paste your URL and start chatting with your custom AI.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <span className="flex items-center gap-5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Try it now - No signup required
          </span>
        </motion.div>
      </motion.div>
 
    </section>
  );
}
