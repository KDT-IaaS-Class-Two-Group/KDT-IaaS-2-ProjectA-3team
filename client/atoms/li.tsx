import { ReactNode } from "react";
interface LiProps {
  li_style: string;
  children: ReactNode;
}
const Li: React.FC<LiProps> = ({ li_style, children }) => {
  return <li className={li_style}>{children}</li>;
};
