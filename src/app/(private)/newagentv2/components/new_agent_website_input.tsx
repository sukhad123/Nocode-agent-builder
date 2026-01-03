import {Input} from "@heroui/react"
import {useState} from "react";
import { useAgent } from "../../contexts/nodeContext";
export default function WebsiteInput()
{
    const {setWebsiteLink} = useAgent();
    //website link
    const [websiteLink, setWebsiteLink_tmp] = useState(""); 

    //TODO: Handle validation of URL
    //handle change
    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setWebsiteLink_tmp(e.target.value);
        setWebsiteLink(e.target.value); 
    }
    return (<>
     <Input  onChange={onHandleChange} type="text" variant="bordered" placeholder="Add your website URL" />
    </>)

}