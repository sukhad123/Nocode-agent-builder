"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HeroUIProvider } from "@heroui/react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
