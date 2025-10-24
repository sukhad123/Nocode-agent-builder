{/**Save and Deploy function in canvas */}
import { Button } from "@heroui/react"
import { useAgent } from "../contexts/agentContext";
import {Modal, ModalContent, useDisclosure} from "@heroui/react"
import { Input } from "@heroui/react";
export default function SaveDeploy()
{
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {openaiAPIKey, systemParams, setAgentName, agentName} = useAgent();
    //on save
    const onHandleSave =()=>{
        onOpen();
      //TODO: Handle save logic
      console.log("Openai API kEY", openaiAPIKey);
      console.log("System params", systemParams);
      console.log("AGENT ANME", agentName);
    }
    return (<>
      <div className ="flex gap-4"><Button onPress={onHandleSave}   className = "text-white" color="primary" variant="faded">Save</Button>
  {/* Deploy button aligned to the end */}
  <Button color="primary" variant="shadow">Deploy</Button></div>
 
   <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
     <ModalContent>
   {(onClose) => (
     <section className = "p-9 flex flex-col gap-4">
       <Input required placeholder="Agent Name" type="text" value ={agentName} variant='bordered' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAgentName(e.target.value);
                }}/>
                <Button  isDisabled={!agentName} color="primary" onPress={onClose}> Save</Button>
       {/* Store the onClose in context */}
     </section>
   )}
 </ModalContent>
 
 
       </Modal>
    </>)
}