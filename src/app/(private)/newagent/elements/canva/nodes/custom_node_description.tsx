
"use client"
{/**Defining a custom node that takes Openai api and system params */}
import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@heroui/react";
import APIInput from "./elements/api_input";
import SystemParams from "./elements/system_params";
import SaveNode from "./elements/save_button";

export  const TextUpdaterNode = () => {

//TODO: Fetch saved api keys
  const [apiKey, setApiKey] = useState('');
  const [params, setParams] = useState( '');


  return (
     <Card className="w-full h-full border-2 border-solid border-gray-600 ">
      <CardHeader className="flex gap-3">
     
        <div className="flex flex-col">
          <p className="text-md">Agent</p>
     
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
       <APIInput/>
        <Divider />
      <SystemParams/>
      </CardBody>
     
      <Divider/>

   <CardFooter>
        <SaveNode/>
      </CardFooter>
      
    </Card>

  )
};