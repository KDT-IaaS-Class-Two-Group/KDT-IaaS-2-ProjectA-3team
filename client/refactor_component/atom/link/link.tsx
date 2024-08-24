/**
 * @file link.tsx
 * @brief 링크 컴포넌트 파일
 * @details 이 파일은 사용자가 정의한 스타일과 URL을 적용하여 링크를 렌더링하는 재사용 가능한 Link 컴포넌트를 정의한다.
 * 주어진 href 속성과 스타일을 사용하여 a 태그를 생성하고, 자식 요소를 링크로 감싼다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import React from "react";
import LinkProps from "./props/link.props";

/**
 * @brief 링크 컴포넌트
 * @details href, link_style, children을 받아 a 태그로 렌더링한다.
 * 주어진 href로 링크를 설정하고, link_style로 스타일을 적용하며, children으로 전달된 내용을 링크로 표시한다.
 * @param {LinkProps} props 링크 컴포넌트가 받는 속성들 (href, link_style, children)
 * @return 스타일이 적용된 a 요소를 반환하여 자식 요소를 감싼 링크를 제공
 */
const Link: React.FC<LinkProps> = ({ href, link_style, children }) => {
  return (
    <a href={href} className={link_style}>
      {children}
    </a>
  );
};

export default Link;
