import React from "react";
interface InputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}
const Input: React.FC<InputProps> = ({ inputValue, setInputValue }) => {
  return (
    <input type="text" placeholder="Enter your input here" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}}/>
  );
};
export default Input;
