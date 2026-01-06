
{/**Create Button */}
import { Button } from "@heroui/react";
import { useAgent } from "../../contexts/nodeContext";
import { Modal, ModalContent, useDisclosure } from "@heroui/react";
import { Input } from "@heroui/react";
import { useState } from "react";
import ToastDisplay from "@/app/components/(private)/Toast/toast_error";
import nodeGenerationParentService from "@/services/updatedNodeService/node_generation_parent";
import { redirect } from "next/navigation";
export default function NewAgentCreateButton() {
    const {setAgentName,openaiAPIKey, additionalContent, websiteLink, agentName} = useAgent();
    //button loading
    const [buttonLoading, setButtonLoading] = useState(false);
      const { isOpen, onOpen, onOpenChange } = useDisclosure();
     
    //handle on click
    const handleOnClick = async () => {
        //Check website and api key
        if(!openaiAPIKey){
            ToastDisplay({
                title: "Enter all Details",
                description: "Enter your OPENAI API KEY",
                color: "danger"
            });
            return;
        }
        if(!websiteLink){
            ToastDisplay({
                title: "Enter all Details", 
                description: "Enter your Website link",
                color: "danger"
            });
            return
        }   
        onOpen();
        //logic to create agent
        //check if all exists if not there is a problem
       
        
       
        //TODO: Move to somewhere else after creation
    }
    
    //save to db
    const savetoDB = async () => {
        //Store to db
        const res= await nodeGenerationParentService({
            openaiAPIKey,
            additionalContent,  
            name:agentName, 
            website_url: websiteLink});
        console.log(res);
        setButtonLoading(false);
       
        // if(res.success){
        //   redirect("/agents/" + (res as { success: boolean; message: string; data: string }).data!);

        // }

        
    }


   
     return (<><Button color="primary" isLoading = {buttonLoading} onPress = {handleOnClick}>Create Agent</Button>
     
         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <section className="p-9 flex flex-col gap-4">
              <Input
                required
                placeholder="Agent Name"
                type="text"
                value={agentName}
                variant="bordered"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAgentName(e.target.value);
                  console.log('Agent Name:', agentName);
                }}
              />
              <Button
                 onPress={async () => {
                    setButtonLoading(true);
                     //Store to db
                    await savetoDB();
                    setButtonLoading(false);
                    onClose();
                 }}
                isDisabled={!agentName}
                isLoading={buttonLoading}
                color="primary"
                
              >
                {" "}
                Save
              </Button>
              {/* Store the onClose in context */}
            </section>
          )}
        </ModalContent>
      </Modal></>);
      
}   