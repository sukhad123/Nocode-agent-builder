"use client";
{/** Agent Parent Component */}
import { useParams } from "next/navigation";
import { useEffect } from "react";
import agent_fetchBy_id from "@/services/updatedNodeService/agent_fetchBy_id";
//TODO: Refined inupt
import React, { useState, useRef } from "react";
import { Card, CardBody,Input, Button } from "@heroui/react";

export default function AgentParentComponent() {
  const params = useParams<{ id: string }>()
  //Retrieve the id from params
  const { id } = params;
  const[websiteURL,setWebsiteURL]= useState("");
  const[api_key_name, setApi_key_name]= useState("");
  const[additionalContent, setAddtionalContent]= useState("");  

  //Fetch the details
 useEffect(()=>{
    const fetchDetails = async () => {
      const res = await agent_fetchBy_id(id);
      console.log(res);
      if(res.success){
        const data = res.data;
        setWebsiteURL(data?.website_url || "");
        setApi_key_name(data?.apiKey?.api_key_name || "");
        setAddtionalContent(data?.additional_info || "");
      }
    };
    fetchDetails();

 }, [])
  return(<>
  <h1>WEbsite: {websiteURL}</h1>
  <h1>API Key Name: {api_key_name}</h1>
  <h1>Additional Info: {additionalContent}</h1>
  </>);              
}   