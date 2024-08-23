/**
 * @file Card.tsx
 * @brief 카드 컴포넌트 파일
 * @details 이 파일은 컨텐츠를 감싸는 카드 UI 컴포넌트를 정의한다.
 * @author @dalramjwi
 * @date 2024-08-23
 */

import CardProps from "./props/card.interface";

/**
 * @brief 카드 컴포넌트
 * @details 카드의 스타일과 자식 요소를 받아 화면에 렌더링하는 컴포넌트.
 * @param {CardProps} props 카드 컴포넌트가 받는 속성들 (container_style, children)
 * @return 스타일이 적용된 div 요소를 반환하여 자식 요소를 감싸는 카드 컴포넌트를 생성
 */
const Card: React.FC<CardProps> = ({ container_style, children }) => {
  return <div className={container_style}>{children}</div>;
};

export default Card;
