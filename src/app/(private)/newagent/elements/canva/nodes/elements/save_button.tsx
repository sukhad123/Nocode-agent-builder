import { Button } from "@heroui/react";
import { useAgent } from "../contexts/agentContext";
import { addToast } from "@heroui/react";
export default function SaveNode() {
  const {
    setOpenaiAPIKey,
    setSystemParams,
    isClose,
    openaiAPIKey,
    systemParams,
  } = useAgent();
  //Handle cancel
  const onCancel = () => {
    //set all the model to null
    setOpenaiAPIKey("");
    setSystemParams("");
    //close the model
    if (isClose) {
      isClose();
    }
  };
  //Handle save
  const onSave = () => {
    //verify all contents exits api key and a system params
    if (systemParams && openaiAPIKey) {
      //all good to do
      if (isClose) {
        isClose();
      }
    } else {
      if (!openaiAPIKey) {
        addToast({
          title: "Enter all Details",
          description: "Enter your OPENAI API KEY",
          color: "warning",
        });
      } else {
        addToast({
          title: "Enter all Details",
          description: "Enter your System Params for your agent.",
          color: "warning",
        });
      }
    }
  };

  return (
    <div className="flex items-center gap-4  justify-center w-full">
      <Button onPress={onSave} variant="solid" color="primary">
        Save Agent
      </Button>
      <Button onPress={onCancel} variant="solid" color="danger">
        Cancel
      </Button>
    </div>
  );
}
