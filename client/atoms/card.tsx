import { ReactNode } from "react";
interface CardProps {
  container_style: string;
  children?: ReactNode;
}
const Card: React.FC<CardProps> = ({ container_style, children }) => {
  return <div className={container_style}>{children}</div>;
};
