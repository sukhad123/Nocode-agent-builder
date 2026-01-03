{/**Error Toast Component */}
import { addToast } from "@heroui/react";
export default function ToastError({title, description, color}:ToastErrorProps){
 addToast({
          title,
          description,
          color
        });
 return null;
}    
type ToastErrorProps = {
    title: string;
    description: string;
    color:"default" | "foreground" | "primary" | "secondary" | "success" | "warning" | "danger" ;
};