// atom/profile/Profile.tsx
import React from "react";
import SidebarNav from "../user_sidebar/SidebarNav"; // SidebarNav 컴포넌트를 가져옵니다.
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

interface ProfileProps {
  userId?: string;
  onMenuItemClick: (component: React.ReactNode) => void;
  sessionData: { user_id: string; role_name: string } | null;
}

const Profile: React.FC<ProfileProps> = ({ userId, onMenuItemClick, sessionData }) => {
  return (
    <div className={styles.profilecontainer}>
      <div className={styles.profile}>
        <div className={styles.profilecircle}></div>
        {userId ? (
          <span className={styles.profilename}>{userId}</span>
        ) : (
          <span className={styles.profilename}>Loading...</span>
        )}
        <span className={styles.menuicon}>⋮</span>
      </div>
      {/* SidebarNav 컴포넌트를 Profile 안에 포함시킵니다 */}
      <SidebarNav onMenuItemClick={onMenuItemClick} sessionData={sessionData} />
    </div>
  );
};

export default Profile;
