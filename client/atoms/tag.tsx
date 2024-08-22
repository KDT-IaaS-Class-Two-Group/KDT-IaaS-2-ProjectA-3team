import { ReactNode } from "react";

interface TagProps {
  content: string;
  className : string;
}
const Tag : React.FC<TagProps> = ({className , content})=>{
  return(
    <p className={className}>{content}</p>
  )
}