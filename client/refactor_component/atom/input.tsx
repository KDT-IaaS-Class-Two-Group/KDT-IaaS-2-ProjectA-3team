import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  input_style: string;
}
const Input: React.FC<InputProps> = ({ input_style }) => {
  return <input className={input_style}></input>;
};
export default Input;