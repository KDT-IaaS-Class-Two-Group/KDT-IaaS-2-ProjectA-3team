import React from "react";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import { Colors } from "../../styles/standard.css";

const Sidebar: React.FC = () => {
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
                <span>dashboard</span>
              </li>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>👥</span>
                <span>team</span>
              </li>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>📁</span>
                <span>projects</span>
              </li>
              <li className={styles.menuitem}>
                <span className={styles.menuitemicon}>📝</span>
                <span>tasks</span>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.userlistcontainer}>
          <div className={styles.userlisttitle}>user list</div>
          <div className={styles.searchcontainer}>
            <input
              type="text"
              placeholder="search"
              className={styles.searchinput}
            />
          </div>
          <ul className={styles.userlist}>
            <li className={styles.userlistitem}></li>
            <li className={styles.userlistitem}></li>
            <li className={styles.userlistitem}></li>
            <li className={styles.userlistitem}></li>
            <li className={styles.userlistitem}></li>
            <li className={styles.userlistitem}></li>
            <li className={styles.userlistitem}></li>
            <li className={styles.userlistitem}></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
