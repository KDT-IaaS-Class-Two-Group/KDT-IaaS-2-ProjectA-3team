/**
 * @file container.tsx
 * @brief 컨테이너 컴포넌트 파일
 * @details 이 파일은 주어진 클래스명과 자식 요소를 포함하는 재사용 가능한 컨테이너 컴포넌트를 정의한다.
 * 다양한 스타일을 적용하여 다양한 레이아웃에서 사용할 수 있는 기본적인 div 컨테이너를 제공한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import React, { ReactNode } from "react";
import ContainerProps from "./props/container.props";

/**
 * @brief 컨테이너 컴포넌트
 * @details className과 children을 받아 스타일이 적용된 div 요소로 렌더링한다.
 * 주어진 className으로 스타일을 적용하고, children으로 전달된 자식 요소들을 포함하는 컨테이너를 생성한다.
 * @param {ContainerProps} props 컨테이너 컴포넌트가 받는 속성들 (className, children)
 * @return 스타일이 적용된 div 요소를 반환하여 자식 요소를 감싸는 컨테이너를 제공
 */
const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default Container;
