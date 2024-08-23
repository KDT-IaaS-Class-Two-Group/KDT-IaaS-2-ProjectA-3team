/**
 * @file ul.tsx
 * @brief 목록 컴포넌트 파일
 * @details 이 파일은 HTML의 ul 요소를 사용하는 목록 컴포넌트를 정의한다.
 * 주어진 스타일과 자식 요소를 사용하여 커스터마이즈된 목록을 생성한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import UlProps from "./props/ul.props";

/**
 * @brief 목록 컴포넌트
 * @details ul_style과 children을 받아 ul 요소를 렌더링한다.
 * 주어진 ul_style로 스타일을 적용하고, children으로 전달된 항목들을 목록으로 표시한다.
 * @param {UlProps} props 목록 컴포넌트가 받는 속성들 (ul_style, children)
 * @return 스타일이 적용된 ul 요소를 반환하여 목록을 표시
 */
const Ul: React.FC<UlProps> = ({ ul_style, children }) => {
  return <ul className={ul_style}>{children}</ul>;
};

export default Ul;
