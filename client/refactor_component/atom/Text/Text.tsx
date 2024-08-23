import React from 'react';

interface TextProps {
  content: string;
  className?: string;  // className 속성 추가
}

const Text: React.FC<TextProps> = ({ content, className }) => {
  return <span className={className}>{content}</span>;
};

export default Text;
