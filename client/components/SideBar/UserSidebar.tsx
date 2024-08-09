import React from "react";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import { Colors } from "../../styles/standard.css";
import { UserSearch } from "../common/nav/UserSearch";

const UserSidebar: React.FC = () => {
  return (
    <div className={styles.mainpagecontainer}>
      <div className={styles.sidebarcontainer}>
        <div className={styles.logocontainer}>
          <div className={styles.logocontent}>
            <img
              src="/delan.png"
              alt="DelaN Logo"
              className={styles.logoimage}
            />
            <span className={styles.logotext}>DelaN</span>
          </div>
          <div className={styles.logounderline}></div>
        </div>
        <div className={styles.profilecontainer}>
          <div className={styles.profile}>
            <div className={styles.profilecircle}></div>
            <span className={styles.profilename}>matomabo</span>
            <span className={styles.menuicon}>⋮</span>
          </div>
          <nav>
            <ul className={styles.menulist}>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>🏠</span>
                <span>프로젝트 조회</span>
              </li>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>👥</span>
                <span>칸반보드</span>
              </li>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>📁</span>
                <span>게시판</span>
              </li>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>📁</span>
                <span>개인정보 조회</span>
              </li>
            </ul>
          </nav>
        </div>
        <UserSearch></UserSearch>
      </div>
    </div>
  );
};

export default UserSidebar;
