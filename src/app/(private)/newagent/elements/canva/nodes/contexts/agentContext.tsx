"use client"
import { createContext, useContext, useState, ReactNode, useRef } from "react";

interface AgentContextType {
  openaiAPIKey: string;
  systemParams: string;
  setOpenaiAPIKey: (key: string) => void;
  setSystemParams: (params: string) => void;
  isClose?: () => void;
  setIsClose: (fn: () => void) => void;
}

const AgentContext = createContext<AgentContextType>({
  openaiAPIKey: "",
  systemParams: "",
  setOpenaiAPIKey: () => {},
  setSystemParams: () => {},
  isClose: undefined,
  setIsClose: () => {},
});

export const useAgent = () => useContext(AgentContext);

interface AgentProviderProps {
  children: ReactNode;
}

export const AgentProvider = ({ children }: AgentProviderProps) => {
  const [openaiAPIKey, setOpenaiAPIKey] = useState("");
  const [systemParams, setSystemParams] = useState("");

  //  useRef for function to avoid re-render loops
  const isCloseRef = useRef<() => void | undefined>(undefined);

  const handleSetIsClose = (fn: () => void) => {
    isCloseRef.current = fn; // store the function without triggering re-render
  };

  return (
    <AgentContext.Provider
      value={{
        openaiAPIKey,
        systemParams,
        setOpenaiAPIKey,
        setSystemParams,
        isClose: () => isCloseRef.current?.(),
        setIsClose: handleSetIsClose,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};
