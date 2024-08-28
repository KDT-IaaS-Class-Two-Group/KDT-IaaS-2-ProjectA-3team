

// organism/admin_sidebar/admin_sidebar.tsx
import React, { useState, useEffect } from "react";
import Sidebar from '../../molecule/admin_sidebar/Sidebar';
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import * as styles from '../../../styles/sidebar/SidebarStyles.css';
import AdminSidebarProps from "./props/admin_sidebar.props";

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onMenuItemClick }) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  // 세션 데이터 로드 로직
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setSessionData(data.session);
        } else {
          console.error("Failed to fetch session data", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch session data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <div className={styles.mainpagecontainer}>
      <Sidebar
        onMenuItemClick={onMenuItemClick}
        loading={loading}
        sessionData={sessionData}
      />
    </div>
  );
};

export default AdminSidebar;
