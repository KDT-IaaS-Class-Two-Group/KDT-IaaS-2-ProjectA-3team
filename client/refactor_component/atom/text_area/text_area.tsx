import { ReactNode } from "react";
interface TextAreaProps {
  children: ReactNode;
  className?: string;
}
const TextArea: React.FC<TextAreaProps> = ({ children, className }) => {
  return <textarea className={className}>{children}</textarea>;
};
export default TextArea;
