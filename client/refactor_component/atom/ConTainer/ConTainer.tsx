import React, { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;  // children 속성을 추가하여 자식 요소를 포함할 수 있게 합니다.
}

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default Container;
