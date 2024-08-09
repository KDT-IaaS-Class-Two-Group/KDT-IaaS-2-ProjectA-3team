import React, { useEffect, useState } from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

export const UserSearch: React.FC = () => {
  return (
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
  );
};
