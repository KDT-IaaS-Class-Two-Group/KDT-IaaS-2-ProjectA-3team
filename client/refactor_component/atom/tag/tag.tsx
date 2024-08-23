/**
 * @file tag.tsx
 * @brief 태그 컴포넌트 파일
 * @details 이 파일은 텍스트를 담는 태그 컴포넌트를 정의한다.
 * 주어진 클래스명과 콘텐츠를 사용하여 단순한 텍스트 태그를 생성한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import { ReactNode } from "react";
import TagProps from "./props/tag.props";

/**
 * @brief 태그 컴포넌트
 * @details className과 content를 받아 p 태그로 렌더링한다.
 * 주어진 className으로 스타일을 적용하고, content를 텍스트로 표시한다.
 * @param {TagProps} props 태그 컴포넌트가 받는 속성들 (className, content)
 * @return 스타일이 적용된 p 요소를 반환하여 텍스트 콘텐츠를 표시
 */
const Tag: React.FC<TagProps> = ({ className, content }) => {
  return <p className={className}>{content}</p>;
};

export default Tag;
