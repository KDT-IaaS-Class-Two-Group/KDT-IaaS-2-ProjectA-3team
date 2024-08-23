/**
 * @file Text.tsx
 * @brief 텍스트 컴포넌트 파일
 * @details 이 파일은 텍스트를 렌더링하기 위한 재사용 가능한 Text 컴포넌트를 정의한다.
 * 주어진 텍스트 콘텐츠와 스타일을 사용하여 span 태그로 텍스트를 표시한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import React from "react";
import TextProps from "./props/text.props";

/**
 * @brief 텍스트 컴포넌트
 * @details content와 className을 받아 span 태그로 렌더링한다.
 * 주어진 className으로 스타일을 적용하고, content로 전달된 텍스트를 표시한다.
 * @param {TextProps} props 텍스트 컴포넌트가 받는 속성들 (content, className)
 * @return 스타일이 적용된 span 요소를 반환하여 텍스트 콘텐츠를 표시
 */
const Text: React.FC<TextProps> = ({ content, className }) => {
  return <span className={className}>{content}</span>;
};

export default Text;
