{/**System Params */}
import {Textarea} from "@heroui/react"
export default function SystemParams()
{
    return (
    <div className = "mt-3">
    <Textarea
          labelPlacement="outside"
        
           style={{ height: "800px" }} 
          placeholder="System Parameters for the agent.."
          variant="bordered"
        />
        
    </div>)
}