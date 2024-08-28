import React from 'react';
import MenuItem from 'client/components/MenuItem/MenuItem';
import UserSelection from 'client/refactor_component/template/team/team';
import ProjectView from 'client/components/project/info';
import NoticeMainPage from 'client/pages/noticeMain';
import DBGUI from '../../template/dash_temp/db_gui';
import * as styles from '../../../styles/sidebar/SidebarStyles.css';

interface MenuListProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}

const MenuList: React.FC<MenuListProps> = ({ onMenuItemClick }) => {
  return (
    <nav>
      <ul className={styles.menulist}>
        <MenuItem
          text="팀 제작"
          onClick={() => onMenuItemClick(<UserSelection />)}
        />
        <MenuItem
          text="프로젝트 제작"
          onClick={() => onMenuItemClick(<ProjectView />)}
        />
        <MenuItem
          text="게시판"
          onClick={() => onMenuItemClick(<NoticeMainPage />)}
        />
        <MenuItem
          text="DB GUI"
          onClick={() => onMenuItemClick(<DBGUI />)}
        />
      </ul>
    </nav>
  );
};

export default MenuList;
