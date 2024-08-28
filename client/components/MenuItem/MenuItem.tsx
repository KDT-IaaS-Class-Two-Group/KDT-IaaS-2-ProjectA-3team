// src/client/refactor_component/atom/menu_item/MenuItem.tsx

import React from 'react';
import Link from 'next/link';
import * as styles from '../../styles/sidebar/SidebarStyles.css';

interface MenuItemProps {
  text: string;
  onClick?: () => void;
  link?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, onClick, link }) => {
  return (
    <li className={styles.menuitem} onClick={onClick}>
      <span className={styles.menuitemicon}></span>
      {link ? (
        <Link href={link} className={styles.atagmenuitem}>
          {text}
        </Link>
      ) : (
        <span>{text}</span>
      )}
    </li>
  );
};

export default MenuItem;
