import React from "react";
import InputProps from "./props/input.props";
// [ ] input 기본 스타일 정의.
const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      className=""
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
export default Input;
