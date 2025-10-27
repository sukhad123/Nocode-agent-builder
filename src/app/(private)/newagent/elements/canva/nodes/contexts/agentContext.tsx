"use client";
import { createContext, useContext, useState, ReactNode, useRef } from "react";
import { type Node, type Edge } from "@xyflow/react";

interface AgentContextType {
  openaiAPIKey: string;
  systemParams: string;
  agentName: string;
  setOpenaiAPIKey: (key: string) => void;
  setSystemParams: (params: string) => void;
  setAgentName: (name: string) => void;
  isClose?: () => void;
  setIsClose: (fn: () => void) => void;
  nodes: Node[];
  setNodes: (key: Node[]) => void;
  edges: Edge[];
  setEdges: (key: Edge[]) => void;
}

const AgentContext = createContext<AgentContextType>({
  openaiAPIKey: "",
  systemParams: "",
  agentName: "",
  setOpenaiAPIKey: () => {},
  setSystemParams: () => {},
  setAgentName: () => {},
  isClose: undefined,
  setIsClose: () => {},
  nodes: [],
  edges: [],
  setNodes: () => {},
  setEdges: () => {},
});

export const useAgent = () => useContext(AgentContext);

interface AgentProviderProps {
  children: ReactNode;
}

export const AgentProvider = ({ children }: AgentProviderProps) => {
  const [openaiAPIKey, setOpenaiAPIKey] = useState("");
  const [systemParams, setSystemParams] = useState("");
  const [agentName, setAgentName] = useState("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

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
        nodes,
        edges,
        setNodes,
        setEdges,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};
