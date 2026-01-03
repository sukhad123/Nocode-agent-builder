{/** Additional Content Input */}
import {Textarea} from "@heroui/react"
import {useState} from "react";
import { useAgent } from "../../contexts/nodeContext";
export default function AdditionalContentInput()
{
    const {setAdditionalContent} = useAgent();
    //additional content
    const [additionalContent, setAdditionalContent_tmp] = useState("");
    //handle change
    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setAdditionalContent_tmp(e.target.value);
        setAdditionalContent(e.target.value);
       
    }
    return (<>
     <Textarea onChange= {onHandleChange}   type="text" variant="bordered" placeholder="Add additional content for the agent" />
    </>)    
}
