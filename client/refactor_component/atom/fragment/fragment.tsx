/**
 * @file fragment.tsx
 * @brief 카드 컴포넌트 파일 : 부모 컴포넌트가 존재하지 않는다.
 * @details 이 파일은 컨텐츠를 감싸는 카드 UI 컴포넌트를 정의한다. 이 때 부모 컴포넌트는
 * @author @dalramjwi
 * @date 2024-08-27
 */

import FragmentProps from "./props/fragment.props";

/**
 * @brief 카드 컴포넌트
 * @details 카드의 스타일과 자식 요소를 받아 화면에 렌더링하는 컴포넌트.
 * @param {FragmentProps} props 카드 컴포넌트가 받는 속성들 (children)
 * @return 스타일이 적용된 div 요소를 반환하여 자식 요소를 감싸는 카드 컴포넌트를 생성
 */
const Fragment: React.FC<FragmentProps> = ({ children }) => {
  return <>{children}</>;
};

export default Fragment;
