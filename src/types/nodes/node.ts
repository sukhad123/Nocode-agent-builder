import { type TOpenAINode } from "../opeani_node/openai_node";
export type TNode = {
  name_id: string;
  data_label: string;
  type: string;
  position_x: number;
  position_y: number;
  opeaniNodeId?: TOpenAINode;
};
