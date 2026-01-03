"use client";
import { createContext, useContext, useState, ReactNode, useRef } from "react";

interface AgentContextType {
  openaiAPIKey: string;
  additionalContent: string;
  websiteLink:string;
  setWebsiteLink: (link: string) => void;
  agentName: string;
  setOpenaiAPIKey: (key: string) => void;
  setAdditionalContent: (content: string) => void;
  setAgentName: (name: string) => void;
  isClose?: () => void;
  setIsClose: (fn: () => void) => void;

}

const AgentContext = createContext<AgentContextType>({
  openaiAPIKey: "",
  additionalContent: "",
  websiteLink: "",
  setWebsiteLink: () => {},
  agentName: "",
  setOpenaiAPIKey: () => {},
  setAdditionalContent: () => {},
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
  const [additionalContent, setAdditionalContent] = useState("");
  const [agentName, setAgentName] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");

  //  useRef for function to avoid re-render loops
  const isCloseRef = useRef<() => void | undefined>(undefined);

  const handleSetIsClose = (fn: () => void) => {
    isCloseRef.current = fn; // store the function without triggering re-render
  };

  return (
    <AgentContext.Provider
      value={{
        openaiAPIKey,
        additionalContent,
        websiteLink,
        agentName,
        setOpenaiAPIKey,
        setAdditionalContent,
        setAgentName,
        setWebsiteLink,
        isClose: () => isCloseRef.current?.(),
        setIsClose: handleSetIsClose
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};
