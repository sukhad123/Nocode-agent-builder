// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/*": ["./src/db/generated/client/*"],
  },
};

export default nextConfig;