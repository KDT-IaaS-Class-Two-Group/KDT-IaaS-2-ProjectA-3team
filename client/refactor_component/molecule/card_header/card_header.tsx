/**
 * @file CardHeader.tsx
 * @brief 카드 헤더 컴포넌트 파일
 * @details 이 파일은 카드 컴포넌트의 헤더 부분을 렌더링하기 위한 재사용 가능한 CardHeader 컴포넌트를 정의한다.
 * 주어진 타이틀을 텍스트로 표시하는 기능을 제공한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import React from "react";
import CardHeaderProps from "./props/card_header.props";
import Text from "client/refactor_component/atom/text/text";
import Button from "client/refactor_component/atom/button/button";
import { cardHeader } from "client/styles/admin/admindashboard.css";

/**
 * @brief 카드 헤더 컴포넌트
 * @details title을 받아 카드의 헤더 부분에 텍스트를 렌더링하며 버튼이 포함될 수 있다.
 * Text 컴포넌트를 사용하여 타이틀을 표시한다.
 * @param {CardHeaderProps} props 카드 헤더 컴포넌트가 받는 속성들 (title)
 * @return div 요소 안에 스타일이 적용된 타이틀 텍스트를 포함하여 반환
 */
const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  buttonText,
  buttonStyle,
  onButtonClick,
}) => {
  return (
    <div className={cardHeader}>
      <div className={""}>
        <Text content={title} className={""} />
        {buttonText && (
          <Button
            button_text={buttonText}
            button_style={buttonStyle || ""}
            onClick={(event) => onButtonClick?.(event)}
          />
        )}
      </div>
    </div>
  );
};

export default CardHeader;
