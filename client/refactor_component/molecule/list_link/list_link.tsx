import React from "react";
import Li from "client/atoms/li";
import Link from "client/refactor_component/atom/link/link";
import ListItemWithLinkProps from "./prpos/list_link.props";


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
