/**
 * @file CardButton.tsx
 * @brief 메인 카드 컴포넌트에서 사용되는 버튼 컴포넌트 파일
 * @details 이 파일은 카드 컴포넌트의 버튼 부분을 렌더링하기 위한 재사용 가능한 CardButton 컴포넌트를 정의한다.
 * 주어진 텍스트와 스타일을 적용한 버튼을 생성하며, 클릭 이벤트 핸들러를 지원한다.
 * @author @dalramjwi
 * @date 2024-08-23
 */
import React from "react";
import { plusButton } from "client/styles/templatebutton.css";
import Button from "client/refactor_component/atom/button/button";
import CardButtonProps from "./props/card_button.props";

/**
 * @brief 카드 헤더에서 사용되는 버튼 컴포넌트
 * @details 버튼 텍스트, 스타일, 클릭 핸들러를 props로 받아 버튼을 렌더링한다.
 * @param {CardButtonProps} props 카드 버튼 컴포넌트가 받는 속성들
 * @return 스타일이 적용된 버튼 요소를 반환
 */
const CardButton: React.FC<CardButtonProps> = ({ onClick }) => {
  return (
    <Button
      button_text={"+"}
      button_style={plusButton}
      onClick={(event) => onClick?.(event)}
    />
  );
};

export default CardButton;
