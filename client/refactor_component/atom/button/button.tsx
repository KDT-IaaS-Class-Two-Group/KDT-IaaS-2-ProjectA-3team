import React from "react";
import ButtonProps from "./props/button.props"; // 경로를 실제 파일 위치로 변경하세요.

const Button: React.FC<ButtonProps> = ({
  button_text,
  button_style,
  onClick,
}) => {
  return (
    <button className={button_style} onClick={onClick}>
      {button_text}
    </button>
  );
};

export default Button;
