import { type Node } from "@xyflow/react";
export const availableNodes: Node[] = [
  {
    id: "start",
    data: { label: "Start" },
    type: "startNode",
    position: { x: 5, y: 100 },
  },
  {
    id: "agent",
    data: { label: "Agent" },
    type: "customNodeUI",
    position: { x: 5, y: 5 },
  },
];
