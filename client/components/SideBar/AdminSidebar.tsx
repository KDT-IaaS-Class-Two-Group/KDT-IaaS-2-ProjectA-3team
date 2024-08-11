import Link from "next/link";
import React from "react";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import { Colors } from "../../styles/standard.css";
import { UserSearch } from "../common/nav/UserSearch";
import Logo from "./../common/logo/Logo";

const AdminSidebar: React.FC = () => {
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
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>🏠</span>
                <Link href="/admin/team">
                  <span>팀 제작</span>
                </Link>
              </li>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>👥</span>
                <Link href="/user/project/info">
                  <span>프로젝트 제작</span>
                </Link>
              </li>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>📁</span>
                <span>게시판</span>
              </li>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>📁</span>
                <span>DB GUI</span>
              </li>
            </ul>
          </nav>
        </div>
        <UserSearch></UserSearch>
      </div>
    </div>
  );
};

export default AdminSidebar;
