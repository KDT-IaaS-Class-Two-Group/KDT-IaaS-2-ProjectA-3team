import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import MenuList from "./menu_list";

interface ProfileProps {
  loading: boolean;
  userId: string | null;
  onMenuItemClick: (component: React.ReactNode) => void;
}

const Profile: React.FC<ProfileProps> = ({ loading, userId, onMenuItemClick }) => (
  <div className={styles.profilecontainer}>
    <div className={styles.profile}>
      <div className={styles.profilecircle}></div>
      {loading ? (
        <span className={styles.profilename}>Loading...</span>
      ) : (
        <span className={styles.profilename}>
          {userId || "Unknown User"}
        </span>
      )}
      <span className={styles.menuicon}>⋮</span>
    </div>
    <MenuList onMenuItemClick={onMenuItemClick} /> {/* MenuList가 Profile 안에 포함됨 */}
  </div>
);

export default Profile;
