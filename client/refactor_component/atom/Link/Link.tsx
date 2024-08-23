// Link.tsx
import React from "react";

interface LinkProps {
  href: string;
  link_style: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, link_style, children }) => {
  return (
    <a href={href} className={link_style}>
      {children}
    </a>
  );
};

export default Link;
