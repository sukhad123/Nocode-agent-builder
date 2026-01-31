"use client";

import { motion } from "framer-motion";

export default function BackgroundGradients() {
  return (
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
  );
}
