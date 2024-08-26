import React from "react";
import Link from "next/link";
import {
  blueButton,
  plusButton,
  purpleButton,
} from "client/styles/templatebutton.css";
import { dbbuttonstyle } from "client/styles/databaseGUI/maindbgui.css";

interface ButtonProps {
  onClick?: () => void;
  button_text?: string;
  button_style?: string;
  link?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, link }) => {
  if (link) {
    return <Link href={link}>+</Link>;
  }

  return (
    <button onClick={onClick} className={plusButton}>
      +
    </button>
  );
};
interface DBButtonProps {
  link: string;
  children: React.ReactNode;
}
export const DBButton: React.FC<DBButtonProps> = ({ link }) => {
  return (
    <Link href={link} className={dbbuttonstyle}>
      See More
    </Link>
  );
};
