// src/components/atom/button/Button.tsx
import React from "react";
import ButtonProps from "./props/button.props";

const Button: React.FC<ButtonProps> = ({
  button_text,
  button_style,
  onClick,
  disabled,
}) => {
  return (
    <button
      // className={button_style || styles.button}
      className={button_style}
      onClick={onClick}
      disabled={disabled}
    >
      {button_text}
    </button>
  );
};

export default Button;
