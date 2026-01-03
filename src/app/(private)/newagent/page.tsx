import { Button } from "@heroui/react";
import CanvaPlayground from "./elements/canva";
import { AgentProvider } from "./elements/canva/nodes/contexts/agentContext";
export default function NewAgentPage() {
  //Retrive params id if exists
  
  return (
    <div>
   

      {/* Add your new agent creation form or components here */}
      {/**Canva Design */}
      <AgentProvider>
        <CanvaPlayground />
      </AgentProvider>
    </div>
  );
}
