import React from "react";
import { useState, useEffect } from "react";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import { UserSearch } from "../common/nav/UserSearch";
import Logo from "../common/logo/Logo";
import UserSelection from "../team/team";
import AdminMainContent from "../adminMainPage/AdminMainPage";
import ProjectView from "../project/info";
import NoticeMainPage from "../../pages/noticeMain";
import DBGUI from "../dbGUI/databaseGUI";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
interface AdminSidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}

interface SessionData {
  user_id: string;
  role_name: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onMenuItemClick }) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

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
          console.log("Session data fetched:", data.session);
        } else {
          console.error("Failed to fetch session data", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch session data", error);
      }
    };

    fetchSessionData();
  }, []);

  const handleMenuItemClick = (component: React.ReactNode) => {
    onMenuItemClick(component);
  };

  const handleLogoClick = () => {
    onMenuItemClick(<AdminMainContent onclick={handleMenuItemClick} />);
  };

  return (
    <div className={styles.mainpagecontainer}>
      <div className={styles.sidebarcontainer}>
        <Logo onClick={handleLogoClick} />
        <div className={styles.profilecontainer}>
          <div className={styles.profile}>
            <div className={styles.profilecircle}></div>
            {sessionData ? (
              <span className={styles.profilename}>{sessionData.user_id}</span>
            ) : (
              <span className={styles.profilename}>Loading...</span>
            )}
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
