import { ChangeEventHandler } from "react";

export default interface SelectProps {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; label: string }[];
  label?: string;  // 선택적인 label 속성 추가
}
