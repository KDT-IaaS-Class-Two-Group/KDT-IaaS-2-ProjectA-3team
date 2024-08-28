// atom/list_item/ListItem.tsx
import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <li className={styles.userlistitem}>{children}</li>;
};

export default ListItem;
