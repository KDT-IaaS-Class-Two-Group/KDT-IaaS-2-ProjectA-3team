/**
 * @file li.tsx
 * @brief 목록 항목 컴포넌트 파일
 * @details 이 파일은 HTML의 li 요소를 사용하는 목록 항목 컴포넌트를 정의한다.
 * 주어진 스타일과 자식 요소를 사용하여 커스터마이즈된 목록 항목을 생성한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import LiProps from "./props/li.props";

/**
 * @brief 목록 항목 컴포넌트
 * @details li_style과 children을 받아 li 요소를 렌더링한다.
 * 주어진 li_style로 스타일을 적용하고, children으로 전달된 내용을 목록 항목으로 표시한다.
 * @param {LiProps} props 목록 항목 컴포넌트가 받는 속성들 (li_style, children)
 * @return 스타일이 적용된 li 요소를 반환하여 목록 항목을 표시
 */
const Li: React.FC<LiProps> = ({ li_style, children }) => {
  return <li className={li_style}>{children}</li>;
};

export default Li;
