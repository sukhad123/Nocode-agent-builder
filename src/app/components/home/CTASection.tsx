"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";

export default function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-20 px-4 md:px-8"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2>Ready to build more powerful agents?</h2>
        <p className="text-gray-400 mb-8">
          Sign up for free to save your agents, access advanced features, and
          connect your own API keys.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            color="primary"
            size="lg"
            onPress={() => (window.location.href = "/signup")}
          >
            Create Free Account
          </Button>
          <Button
            variant="bordered"
            size="lg"
            onPress={() => (window.location.href = "/signin")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
