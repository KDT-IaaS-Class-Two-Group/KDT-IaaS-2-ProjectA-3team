import React from "react";
import Li from "client/atoms/li";
import Link from "client/refactor_component/atom/Link/Link"; // Atom 컴포넌트

interface ListItemWithLinkProps {
  li_style: string;
  link_style: string;
  text: string;
  href: string;
}

const ListItemWithLink: React.FC<ListItemWithLinkProps> = ({
  li_style,
  link_style,
  text,
  href,
}) => {
  return (
    <Li li_style={li_style}>
      <Link href={href} link_style={link_style}>
        {text}
      </Link>
    </Li>
  );
};

export default ListItemWithLink;
