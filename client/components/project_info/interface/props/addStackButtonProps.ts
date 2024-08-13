import { Dispatch, SetStateAction } from "react";
import { StackResult } from "../stackResult.interface";
interface StackButtonProps {
  setProjectStack: Dispatch<SetStateAction<StackResult[]>>;
  project_name: string;
  stack: StackResult[];
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default StackButtonProps;