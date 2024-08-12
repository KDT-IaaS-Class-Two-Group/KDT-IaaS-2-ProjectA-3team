import React from "react";
import Link from "next/link";

interface ButtonProps {
  onClick?: () => void;
  link?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, link }) => {
  if (link) {
    return (
      <Link href={link} passHref>
        <button>+</button>
      </Link>
    );
  }

  return <button onClick={onClick}>+</button>;
};

export default Button;
