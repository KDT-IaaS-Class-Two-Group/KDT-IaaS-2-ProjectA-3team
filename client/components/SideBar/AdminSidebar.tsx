import React from "react";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import { UserSearch } from "../common/nav/UserSearch";
import Logo from "../common/logo/Logo";
import UserSelection from "../team/team";
import AdminMainContent from "../adminMainPage/AdminMainPage";
import ProjectView from "../project/info";
import NoticeMainPage from "../Notice/noticeMain";
import DBGUI from "../dbGUI/databaseGUI";
interface AdminSidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onMenuItemClick }) => {
  const handleMenuItemClick = (component: React.ReactNode) => {
    onMenuItemClick(component);
  };

  const handleLogoClick = () => {
    // onClick 핸들러를 적절히 설정합니다.
    onMenuItemClick(<AdminMainContent onclick={handleMenuItemClick} />);
  };

  return (
    <div className={styles.mainpagecontainer}>
      <div className={styles.sidebarcontainer}>
        <Logo onClick={handleLogoClick} />
        <div className={styles.profilecontainer}>
          <div className={styles.profile}>
            <div className={styles.profilecircle}></div>
            <span className={styles.profilename}>matomabo</span>
            <span className={styles.menuicon}>⋮</span>
          </div>
          <nav>
            <ul className={styles.menulist}>
              <MenuItem
                text="팀 제작"
                onClick={() => handleMenuItemClick(<UserSelection />)}
              />
              <MenuItem
                text="프로젝트 제작"
                onClick={() => handleMenuItemClick(<ProjectView />)}
              />
              <MenuItem
                text="게시판"
                onClick={() => handleMenuItemClick(<NoticeMainPage />)}
              />
              <MenuItem
                text="DB GUI"
                onClick={() => handleMenuItemClick(<DBGUI />)}
              />
            </ul>
          </nav>
        </div>
        <UserSearch />
      </div>
    </div>
  );
};

const MenuItem: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <li className={styles.menuitem} onClick={onClick}>
      <span className={styles.menuitemicon}></span>
      <span>{text}</span>
    </li>
  );
};

export default AdminSidebar;
