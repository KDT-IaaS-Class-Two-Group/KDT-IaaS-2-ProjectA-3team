import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => (
  <p className={className}>{children}</p>
);

export default Paragraph;
