import React, { ReactNode } from "react";

export default interface ContainerProps {
  className?: string;
  children: ReactNode; // children 속성을 추가하여 자식 요소를 포함할 수 있게 합니다.
}
