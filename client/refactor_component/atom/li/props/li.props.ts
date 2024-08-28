import { ReactNode } from "react";

export default interface LiProps {
  li_style?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
