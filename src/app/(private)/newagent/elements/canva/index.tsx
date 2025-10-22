"use client"
{
  /*Canva Playground */
}

import {
  useReactFlow,
  Background,
  Controls,
  ReactFlow,
  addEdge,
  EdgeLabelRenderer,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type DefaultEdgeOptions,
  Handle, 
  Position, 
  useUpdateNodeInternals

} from '@xyflow/react';
import "@xyflow/react/dist/style.css";
import { Button } from "@heroui/react";
import { StartNode } from "./nodes/start_node";
import { CustomNodeUI } from "./nodes/custom_node_ui";
import { useState, useCallback } from "react";
import { useAgent } from './nodes/contexts/agentContext';

export default function CanvaPlayground() {

  const {openaiAPIKey,systemParams} = useAgent();
//onSave
const onHandleSave =()=>{
  //TODO: Handle save logic
  console.log("Openai API kEY", openaiAPIKey);
  console.log("System params", systemParams);
}
 //Available Nodes
 const nodeTypes ={
  startNode: StartNode,
  customNodeUI: CustomNodeUI,
 }
 //TODO:Fetch those from db to display saved agents
 const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  //available nodes
  const availableNodes: Node[] = [
     { id: 'start', data: { label: 'Start' }, type :'startNode',position: { x: 5, y: 100 } },
  { id: 'agent', data: { label: 'Agent' }, type :'customNodeUI',position: { x: 5, y: 5 }},
 
];

const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
 const addNode = (node:Node) => {
    setNodes((nds) => [...nds, node]);
    console.log('Node added:', nodes);
  };
   
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],

  );
 const onConnect: OnConnect = useCallback(
  (connection) => {
    const newEdge = {
      ...connection,
      // type: 'edgeType', // Set the custom edge type
    };
    setEdges((eds) => addEdge(newEdge, eds));
  },
  [setEdges]
);
  return (
    
    <main className = "h-screen w-screen overflow-hidden">
    <div className = "h-[80%] w-[70%] border-2 border-solid border-indigo-500/50 mx-auto ">
     
     <div className="p-4 flex flex-wrap gap-4 items-center justify-between">
  {/* Node buttons */}
  <div className="flex flex-wrap gap-4">
    {availableNodes.map((node) => (
      <Button
        color="primary"
        variant="faded"
        className = "text-white"
        key={node.id}
        onPress={() => addNode(node)}
      >
        {(node.data as { label: string }).label}
      </Button>
    ))}
  </div>
  <div className ="flex gap-4"><Button onPress={onHandleSave}   className = "text-white" color="primary" variant="faded">Save</Button>
  {/* Deploy button aligned to the end */}
  <Button color="primary" variant="shadow">Deploy</Button></div>
 
</div>

    
      <ReactFlow  colorMode="dark" nodes = {nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}    onConnect={onConnect}
      nodeTypes = {nodeTypes} >
        <Background />
        <Controls />
      </ReactFlow>
  
    
      
    </div>
    {/*Test button to deploy**/}
    </main>
  );
}
