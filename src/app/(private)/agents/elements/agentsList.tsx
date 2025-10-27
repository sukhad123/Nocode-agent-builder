"use client";
{
  /**Render all the available agents from database */
}
import { fetchAllAgent } from "@/services/agent/fetch_agent";
import AgentCard from "./AgentCard";
import { type Node, type Edge } from "@xyflow/react";
import { useEffect } from "react";
export default function Agents() {
  //TODO Fetch all agents fromdb

  useEffect(() => {
    const fetchAgent = async () => {
      const agents = await fetchAllAgent();
      return agents;
    };
    fetchAgent();
  }, []);
  const dummyAgentCards: AgentCard[] = [
    {
      name: "SupportBot",
      node: [
        {
          id: "1",
          data: { label: "Start" },
          position: { x: 50, y: 50 },
          type: "startNode",
        },
        {
          id: "2",
          data: { label: "Greet User" },
          position: { x: 200, y: 100 },
          type: "customNodeUI",
        },
        {
          id: "3",
          data: { label: "Provide Help" },
          position: { x: 400, y: 100 },
          type: "customNodeUI",
        },
      ],
      edge: [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3" },
      ],
      systemParams: "Friendly tone, answer FAQs concisely.",
      opeaniAPIkey: "sk-demo-support-123",
    },
    {
      name: "SalesGuru",
      node: [
        {
          id: "1",
          data: { label: "Start" },
          position: { x: 50, y: 50 },
          type: "startNode",
        },
        {
          id: "2",
          data: { label: "Offer Product" },
          position: { x: 200, y: 120 },
          type: "customNodeUI",
        },
        {
          id: "3",
          data: { label: "Close Deal" },
          position: { x: 400, y: 120 },
          type: "customNodeUI",
        },
      ],
      edge: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
      ],
      systemParams: "Persuasive, focus on upselling with empathy.",
      opeaniAPIkey: "sk-demo-sales-456",
    },
    {
      name: "TechWhiz",
      node: [
        {
          id: "1",
          data: { label: "Start" },
          position: { x: 50, y: 60 },
          type: "startNode",
        },
        {
          id: "2",
          data: { label: "Diagnose Issue" },
          position: { x: 200, y: 100 },
          type: "customNodeUI",
        },
        {
          id: "3",
          data: { label: "Suggest Fix" },
          position: { x: 400, y: 140 },
          type: "customNodeUI",
        },
      ],
      edge: [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3" },
      ],
      systemParams: "Precise and technical, focus on problem-solving steps.",
      opeaniAPIkey: "sk-demo-tech-789",
    },
    {
      name: "TravelBuddy",
      node: [
        {
          id: "1",
          data: { label: "Start" },
          position: { x: 50, y: 80 },
          type: "startNode",
        },
        {
          id: "2",
          data: { label: "Ask Destination" },
          position: { x: 200, y: 150 },
          type: "customNodeUI",
        },
        {
          id: "3",
          data: { label: "Suggest Itinerary" },
          position: { x: 400, y: 150 },
          type: "customNodeUI",
        },
      ],
      edge: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
      ],
      systemParams: "Friendly and adventurous; focus on travel planning.",
      opeaniAPIkey: "sk-demo-travel-321",
    },
    {
      name: "FinanceMentor",
      node: [
        {
          id: "1",
          data: { label: "Start" },
          position: { x: 50, y: 90 },
          type: "startNode",
        },
        {
          id: "2",
          data: { label: "Assess Budget" },
          position: { x: 200, y: 100 },
          type: "customNodeUI",
        },
        {
          id: "3",
          data: { label: "Recommend Investments" },
          position: { x: 400, y: 100 },
          type: "customNodeUI",
        },
      ],
      edge: [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3" },
      ],
      systemParams: "Analytical, informative, uses financial examples.",
      opeaniAPIkey: "sk-demo-finance-654",
    },
  ];
  return (
    <div className="m-22 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 p-4 gap-4 border-2 border-solid rounded-xl border-indigo-500/50 ">
      {dummyAgentCards.map((agent) => (
        <div key={agent.name}>
          <AgentCard name={agent.name} />
        </div>
      ))}
    </div>
  );
}
type AgentCard = {
  name: string;
  node: Node[];
  edge: Edge[];
  systemParams: string;
  opeaniAPIkey: string;
};
