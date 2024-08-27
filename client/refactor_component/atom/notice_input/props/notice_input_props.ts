import { ChangeEventHandler } from "react";
export default interface InputProps {
  id : string;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder : string;
  style : string;
}
