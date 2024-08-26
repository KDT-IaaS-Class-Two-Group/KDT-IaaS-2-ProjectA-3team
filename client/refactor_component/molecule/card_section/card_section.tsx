/**
 * @file CardSection.tsx
 * @brief 카드 섹션 컴포넌트 파일
 * @details 이 파일은 카드 컴포넌트를 포함하는 섹션을 정의하며, 카드의 헤더와 버튼, 콘텐츠를 렌더링한다.
 *
 * @author @dalramjwi
 * @date 2024-08-26
 */

import React from "react";
import { cardContent } from "client/styles/admin/admindashboard.css";
import CardHeader from "../card_header/card_header";
import Card from "client/refactor_component/atom/card/card";
import CardSectionProps from "./props/card_section.props";

/**
 * @brief 카드 섹션 컴포넌트
 * @details Card 컴포넌트를 사용하여 섹션을 렌더링하며, 카드의 헤더와 버튼, 콘텐츠를 포함한다.
 * @param {CardSectionProps} props 카드 섹션 컴포넌트가 받는 속성들 (sectionClassName, title, buttonText, onClick, content)
 * @return 카드 헤더, 버튼, 그리고 콘텐츠를 포함한 카드 섹션을 반환
 */
const CardSection: React.FC<CardSectionProps> = ({
  sectionClassName,
  title,
  buttonText,
  onClick,
  children,
}) => {
  return (
    <Card container_style={sectionClassName}>
      <CardHeader
        title={title}
        buttonText={buttonText}
        onButtonClick={onClick}
      />
      <div className={cardContent}>{children}</div>
    </Card>
  );
};

export default CardSection;
