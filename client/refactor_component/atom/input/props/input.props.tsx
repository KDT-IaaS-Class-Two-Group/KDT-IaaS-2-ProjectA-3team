import { ChangeEventHandler } from "react";
export default interface InputProps {
  id : string;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder : string;
  className?: string;
}
