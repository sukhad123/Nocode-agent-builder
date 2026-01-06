
import {Card, CardHeader, CardBody, Button,CardFooter, Divider, Link, Image} from "@heroui/react";
import agent_deleteBy_id from "@/services/updatedNodeService/agent_deleteBy_id";
import ToastDisplay from "@/app/components/(private)/Toast/toast_error";
import { redirect } from "next/navigation";
export default function AgentCard({ name, id}: TCardProps) {
  //onClick agent
  const handleOnClick = (id:string) => {
    //TODO Navigate to agent detail page
    redirect("/agents/" + id);

  }
  //Handle delete
  const handleDelete = async (id:string) => {
    //TODO Call delete service
    const res =await agent_deleteBy_id(id);
    //Display appropriate toast accordingly
    if(res.success){
      ToastDisplay({title:"Agent deleted successfully",description:"The agent has been deleted.",color:"success"});
    } else {
      ToastDisplay({title:"Error deleting agent",description:"There was an error deleting the agent.",color:"danger"});
    }
  };
  return (
   <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
         
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className = "flex flex-row gap-2">
          <Button color="primary" onPress ={()=>{handleOnClick(id)}}>Open</Button>
          <Button color="danger" onPress = {() => handleDelete(id)}>Delete</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

//type for the card
type TCardProps = {
  name: string;
  id:string
};
