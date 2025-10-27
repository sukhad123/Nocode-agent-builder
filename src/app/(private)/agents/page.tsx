{
  /**Display all the agents */
}
import { Button } from "@heroui/react";
import Agents from "./elements/agentsList";
export default function AgentPage() {
  return (
    <div>
      <section className="px-150 py-10 flex justify-center">
        <Button>Your Agents </Button>
      </section>
      <Agents />
    </div>
  );
}
