"use client";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@heroui/react";
import {useState} from "react";
import APIInput from "./new_agent_select_api_key"; 
import WebsiteInput from "./new_agent_website_input";
import AdditionalContentInput from "./new_agent_additional_content";
import NewAgentCreateButton from "./new_agent_create_button";
export default function Agent() {
    //website link
    const  [websiteLink, setWebsiteLink] = useState("");
    //additional content
    const [additionalContent, setAdditionalContent] = useState("");
    //api key
    const [apiKey, setApiKey] = useState("");
  return (
    <div className=" ">
           <Card className="max-w-[400px] w-md   ">
      <CardHeader className="flex gap-3">

        <div className="flex flex-col"><p className="text-md">create your agent</p>
           
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className = "flex flex-col gap-4">
          <WebsiteInput />
            <APIInput />
            <AdditionalContentInput />
          
            
        </div>
      </CardBody>
      <Divider />
      <CardFooter className ="flex justify-center">
        <NewAgentCreateButton />
      </CardFooter>
    </Card>
    </div>
    );              
}
