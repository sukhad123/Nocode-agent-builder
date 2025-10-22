{/**System Params */}
import {Textarea} from "@heroui/react"
import { useState } from "react";
import { useAgent } from "../contexts/agentContext";
export default function SystemParams()
{
    const {setSystemParams, systemParams} = useAgent();
     console.log("inital", systemParams);
    //Handle change for systemparams
     const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.target.value);
        setSystemParams(e.target.value);
        console.log("updated system params", systemParams);
        

    }
    //focus
    const[focus, setFocus] = useState<boolean>(false);
    const[value, setValue] = useState<string>(systemParams)
    return (
    <div className = "mt-3">
    <Textarea
    onFocus={() => setFocus(true)}  
       onBlur={() => setFocus(false)}  
          labelPlacement="outside"
            style={{
        height: focus ? "600px" : "300px",
        transition: "all 0.3s ease-in-out",
      }}
      value={value}
    onChange={onHandleChange} 
          placeholder="System Parameters for the agent.."
          variant="bordered"  
          
        />
        
    </div>)
}