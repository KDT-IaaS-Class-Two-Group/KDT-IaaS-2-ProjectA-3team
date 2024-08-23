import { ChangeEventHandler } from "react";

export default interface SelectProps {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[];
}
