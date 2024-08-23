import React from "react";

export default interface ButtonProps {
  button_text: string;
  button_style: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; // 수정된 부분
}
