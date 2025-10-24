import Image from "next/image";
import { TextUpdaterNode } from "./(private)/newagent/elements/canva/nodes/custom_node_description";
import { CustomNodeUI } from "./(private)/newagent/elements/canva/nodes/custom_node_ui";
import { StartNode } from "./(private)/newagent/elements/canva/nodes/start_node";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <button>Test canva</button>
    </div>
  );
}
