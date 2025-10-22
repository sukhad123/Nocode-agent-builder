import { Input } from "@heroui/react"
import { useMemo } from "react";
import {Select, SelectItem} from "@heroui/react";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { useAgent } from "../contexts/agentContext";
import { openAsBlob } from "fs";
export default function APIInput()
{
    const {setOpenaiAPIKey, openaiAPIKey} = useAgent();
    console.log("OPenai keyu", openaiAPIKey)
    //Fetch stored from db
 const [apiKeys, setApiKeys] = useState([
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key:"custom", label:"Create New One"}
]);

 const [value, setValue] = useState(openaiAPIKey);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setValue(selected);
    if(selected != "custom")
    setOpenaiAPIKey(selected);
  };



  //api and nickname
  const[credentialName,setCredentialName] = useState<string>('');
  const[credential, setCredential] = useState<string>('');
  //on new openai key submitted
const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if (apiKeys.some((item) => item.key === credentialName)) {
      return alert("Key already exists!");
    }
       setApiKeys((prev) => [
      ...prev,
      { key: credential, label: credentialName },
    ]);
    
    
    console.log(apiKeys)
    setValue(credential);
    setOpenaiAPIKey(credential);
    
    //Set everything to default
    setCredential("");
    setCredentialName("");

   
    

}
  const[btnStatus, setStatus] = useState<boolean>(false);
  //update the status if any of those change
  useEffect(()=>{
    if (credentialName && credential) {
        // set the btn status to true
        setStatus(true);
    } else {
        setStatus(false);
    }
  },[credential,credentialName])



    //TODO: LOGIC TO SAVE API KEY GOES HERE
    return <>
 <Select
 aria-label="OpenAI API Key"
  className="w-full"
  items={apiKeys}
  placeholder="OpenAI API KEY"
  variant="bordered"
  value={value}
  onChange={handleSelectionChange}
>
  {apiKeys.map((item) => (
    <SelectItem key={item.key}>
      {item.label}
    </SelectItem>
  ))}
</Select>


    {/**Open Input Field when the custom is selected */}
    {value === "custom" && (
        <div>
            <form onSubmit= {onHandleSubmit}
            className = "flex flex-col gap-4 p-4">
            <Input required placeholder="Credential Name" type="text" variant='bordered' value={credentialName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCredentialName(e.target.value);
            }}/>
            <Input required placeholder="OpenAI Api Key" type="text" variant='bordered' value={credential} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCredential(e.target.value);
            }} />
              <Button type ="submit" isDisabled={!btnStatus} color="primary"> Add</Button>
            </form>
             
        </div>
      
    )}
   
    </>
}


