import { ChangeEventHandler } from "react";
export default interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  input_type : string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder : string;
}
