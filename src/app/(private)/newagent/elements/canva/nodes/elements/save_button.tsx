import { Button } from "@heroui/react"
export default function SaveNode()
{
    return(
      <div className="flex items-center gap-4  justify-center w-full"> 
    <Button variant="solid" color="primary">Save Agent</Button>
       <Button variant="solid" color="danger">Cancel</Button>
    </div>)
}