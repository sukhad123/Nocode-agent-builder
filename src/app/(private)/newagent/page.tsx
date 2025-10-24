import { Button} from "@heroui/react";
import CanvaPlayground from "./elements/canva";
import { AgentProvider } from "./elements/canva/nodes/contexts/agentContext";
export default function NewAgentPage() {
  return (
    <div>
    <section className="px-150 py-10 flex justify-center">
  <Button>Create new Agent</Button>
</section>

      {/* Add your new agent creation form or components here */}
      {/**Canva Design */}
      <AgentProvider>
        <CanvaPlayground />
      </AgentProvider>

      
    </div>
  );
}
