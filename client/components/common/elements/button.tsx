import React from "react";
import Link from "next/link";
import {
  blueButton,
  plusButton,
  purpleButton,
} from "client/styles/templatebutton.css";

interface ButtonProps {
  onClick?: () => void;
  link?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, link }) => {
  if (link) {
    return <Link href={link}>+</Link>;
  }

  return (
    <button onClick={onClick} className={plusButton}>
      +
    </button>
  );
};

export default Button;
