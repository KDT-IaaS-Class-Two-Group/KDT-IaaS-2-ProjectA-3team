/**
 * @file button.tsx
 * @brief 버튼 컴포넌트 파일
 * @details 이 파일은 재사용 가능한 버튼 컴포넌트를 정의한다. 다양한 스타일과 텍스트를 받아
 * 사용자가 원하는 버튼을 생성할 수 있도록 한다.
 *
 * @author @dalramjwi
 * @date 2024-08-23
 */

import React from "react";
import ButtonProps from "./props/button.props";

/**
 * @brief 버튼 컴포넌트
 * @details 버튼 텍스트, 스타일, 클릭 이벤트 핸들러, 비활성화 여부를 props로 받아 동작하는 버튼 컴포넌트.
 * @param {ButtonProps} props 버튼 컴포넌트가 받는 속성들
 * @return 재사용 가능한 버튼 UI 컴포넌트를 반환
 */
const Button: React.FC<ButtonProps> = ({
  button_text,
  button_style,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={button_style} // 버튼 스타일을 적용
      onClick={onClick} // 클릭 이벤트 핸들러
      disabled={disabled} // 버튼 비활성화 여부
    >
      {/* 버튼에 표시될 텍스트 */}
      {button_text}
    </button>
  );
};

export default Button;
