
"use client"
{/**Defining a custom node that takes Openai api and system params */}
import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { TextUpdaterNode } from "./custom_node_description";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@heroui/react";
import { Button } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";


export const CustomNodeUI = () => {
    //Define for Model Window
     const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Handle type="target" position={Position.Left} id="left-handle" />

    <Card className="max-w-[400px] border-2 border-solid border-gray-600">
      <CardHeader className="flex gap-3">
       <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src="/Images/agentImage.png"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Agent</p>
     
        </div>
      </CardHeader>
      <Divider />
        <CardBody className="flex flex-col items-center gap-3">
    <Button onPress={onOpen} color="default" className="w-full">
      Customize your Agent
    </Button>
   

   
  </CardBody>
     
      <Divider/>
      
    </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (<TextUpdaterNode  />)}
        </ModalContent>
      </Modal>
    </>

    

  )
};