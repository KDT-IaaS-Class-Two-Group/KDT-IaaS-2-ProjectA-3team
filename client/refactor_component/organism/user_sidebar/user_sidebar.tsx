// organism/sidebar/Sidebar.tsx
import React, { useState, useEffect } from "react";
import Profile from "../user_sidebar/Profile"; // Profile 컴포넌트를 가져옵니다.
import Logo from "../../template/logo/logo"; // 로고 컴포넌트
import UserSearch from "client/refactor_component/template/nav/user_search_template";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import UserMainContent from "client/refactor_component/template/main_content/user/user_main_content";

interface SidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}

interface SessionData {
  user_id: string;
  role_name: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuItemClick }) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(
    <UserMainContent onclick={onMenuItemClick} />
  );

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setSessionData(data.session);
        } else {
          console.error("세션 가져오기 실패 : ", response.statusText);
        }
      } catch (error) {
        console.error("세션 가져오기 실패 : ", error);
      }
    };

    fetchSessionData();
  }, []);

  const handleLogoClick = () => {
    const userMainContentComponent = (
      <UserMainContent onclick={onMenuItemClick} />
    );
    setCurrentComponent(userMainContentComponent);
    onMenuItemClick(userMainContentComponent);
  };

  const handleMenuItemClick = (component: React.ReactNode) => {
    setCurrentComponent(component);
    onMenuItemClick(component);
  };

  return (
    <div className={styles.sidebarcontainer}>
      <Logo onClick={handleLogoClick} />
      <Profile 
        userId={sessionData?.user_id} 
        onMenuItemClick={handleMenuItemClick} 
        sessionData={sessionData} 
      />
      <UserSearch />
    </div>
  );
};

export default Sidebar;
