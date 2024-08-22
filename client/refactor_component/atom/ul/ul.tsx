import { ReactNode } from "react";
interface UlProps {
  ul_style: string;
  children: ReactNode;
}
const Ul: React.FC<UlProps> = ({ ul_style, children }) => {
  return <ul className={ul_style}>{children}</ul>;
};
export default Ul;
