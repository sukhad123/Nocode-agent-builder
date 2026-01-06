{/**Error Toast Component */}
import { addToast } from "@heroui/react";
export default function ToastDisplay({title, description, color}:ToastDisplayProps){
 addToast({
          title,
          description,
          color
        });
 return null;
}    
type ToastDisplayProps = {
    title: string;
    description: string;
    color:"default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" ;
};