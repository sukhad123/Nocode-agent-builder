
import Agent from "./components/agent_parent";
import { AgentProvider } from "../contexts/nodeContext";
export default function NewAgentV2Page() {
  return (
    <div className="flex justify-center mt-10">
        <AgentProvider>
               <Agent />
        </AgentProvider>
      
            
    </div>
    );              
}
