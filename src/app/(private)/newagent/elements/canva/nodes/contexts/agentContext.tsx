"use client"
import { createContext, useContext, useState, ReactNode, useRef } from "react";

interface AgentContextType {
  openaiAPIKey: string;
  systemParams: string;
  agentName:string;
  setOpenaiAPIKey: (key: string) => void;
  setSystemParams: (params: string) => void;
  setAgentName:(name:string)=>void;
  isClose?: () => void;
  setIsClose: (fn: () => void) => void;
}

const AgentContext = createContext<AgentContextType>({
  openaiAPIKey: "",
  systemParams: "",
  agentName :"",
  setOpenaiAPIKey: () => {},
  setSystemParams: () => {},
  setAgentName: () => {},
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
  const[agentName, setAgentName] = useState("")

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
        agentName,
        setOpenaiAPIKey,
        setSystemParams,
        setAgentName,
        isClose: () => isCloseRef.current?.(),
        setIsClose: handleSetIsClose,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};
