/**
 * @file label.tsx
 * @brief 라벨 컴포넌트 파일
 * @details 이 파일은 폼 요소와 연결된 레이블을 렌더링하는 재사용 가능한 Label 컴포넌트를 정의한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import React from "react";
import LabelProps from "./props/label.props";

/**
 * @brief 라벨 컴포넌트
 * @details htmlFor 속성을 통해 특정 폼 요소와 연결된 레이블을 렌더링하며, 자식 요소를 받아 라벨로 표시한다.
 * @param {LabelProps} props 라벨 컴포넌트가 받는 속성들 (htmlFor, children)
 * @return 연결된 폼 요소와 자식 요소를 포함한 label 요소를 반환
 */
const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};

export default Label;
