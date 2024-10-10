import React from "react";

interface HeaderProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, onClick, className }) => (
  <h1 className={className} onClick={onClick}>
    {children}
  </h1>
);

export default Header;
