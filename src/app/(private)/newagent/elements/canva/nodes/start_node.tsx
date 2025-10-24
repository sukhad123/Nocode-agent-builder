{
  /**Start Node */
}
import { Handle, Position } from "@xyflow/react";

export const StartNode = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center border-2 border-solid border-gray-600 justify-center w-24 h-24 rounded-full shadow-lg">
        Start
      </div>
      <Handle type="source" position={Position.Right} id="right-handle" />
    </div>
  );
};
