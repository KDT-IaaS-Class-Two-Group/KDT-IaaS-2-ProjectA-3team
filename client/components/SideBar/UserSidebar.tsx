import React from "react";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import { UserSearch } from "../common/nav/UserSearch";
import Logo from "../common/logo/Logo";

interface UserSidebarProps {
  onSelect: (component: string) => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ onSelect }) => {
  return (
    <div className={styles.mainpagecontainer}>
      <div className={styles.sidebarcontainer}>
        <Logo />
        <div className={styles.profilecontainer}>
          <div className={styles.profile}>
            <div className={styles.profilecircle}></div>
            <span className={styles.profilename}>matomabo</span>
            <span className={styles.menuicon}>⋮</span>
          </div>
          <nav>
            <ul className={styles.menulist}>
              <li
                className={styles.menuitem}
                onClick={() => onSelect("projects")}
              >
                <span className={styles.menuitemicon}>🏠</span>
                <span>프로젝트 조회</span>
              </li>
              <li
                className={styles.menuitem}
                onClick={() => onSelect("kanban")}
              >
                <span className={styles.menuitemicon}>👥</span>
                <span>칸반보드</span>
              </li>
              <li className={styles.menuitem} onClick={() => onSelect("board")}>
                <span className={styles.menuitemicon}>📁</span>
                <span>게시판</span>
              </li>
              <li
                className={styles.menuitem}
                onClick={() => onSelect("profile")}
              >
                <span className={styles.menuitemicon}>📁</span>
                <span>개인정보 조회</span>
              </li>
            </ul>
          </nav>
        </div>
        <UserSearch />
      </div>
    </div>
  );
};

export default UserSidebar;
