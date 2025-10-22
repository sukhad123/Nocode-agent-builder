import { useEffect } from "react";
import { useAgent } from "../contexts/agentContext";

export default function StoreClose({ onClose }: { onClose: () => void }) {
  const { setIsClose } = useAgent();

  useEffect(() => {
    setIsClose(onClose);
  }, [onClose, setIsClose]);

  return null; 
}
