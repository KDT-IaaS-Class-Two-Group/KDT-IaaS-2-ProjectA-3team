import React, { useState, useEffect } from "react";
import Link from "next/link";
import router from "next/router";
import UserSearchPage from "client/refactor_component/template/nav/user_search_template";
import Logo from "client/refactor_component/template/logo/logo";
import DBGUI from "client/refactor_component/template/dash_temp/db_gui";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import UserSelection from "../../refactor_component/template/team/team";
import AdminMainContent from "../../refactor_component/template/main_content/admin/admin_main_content";
import ProjectView from "../project/info";
import NoticeMainPage from "../../pages/noticeMain";

interface AdminSidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}

interface SessionData {
  user_id: string;
  role_name: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onMenuItemClick }) => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleLogoClick = () => {
    console.log("Logo clicked");
    router.push("/admin/home");
    onMenuItemClick(
      <AdminMainContent
        onclick={(component: React.ReactNode) => {
          onMenuItemClick(component);
        }}
      />
    ); // 또는 다른 함수 전달
  };

  return (
    <div className={styles.mainpagecontainer}>
      <div className={styles.sidebarcontainer}>
        <Logo onClick={handleLogoClick} />
        <div className={styles.profilecontainer}>
          <div className={styles.profile}>
            <div className={styles.profilecircle}></div>
            {loading ? (
              <span className={styles.profilename}>Loading...</span>
            ) : (
              <span className={styles.profilename}>
                {sessionData?.user_id || "Unknown User"}
              </span>
            )}
            <span className={styles.menuicon}>⋮</span>
          </div>
          <nav>
            <ul className={styles.menulist}>
              <MenuItem
                text="팀 제작"
                onClick={() => onMenuItemClick(<UserSelection />)}
              />
              <MenuItem
                text="프로젝트 제작"
                onClick={() => onMenuItemClick(<ProjectView />)}
              />
              <MenuItem
                text="게시판"
                onClick={() => onMenuItemClick(<NoticeMainPage />)}
              />
              <MenuItem
                text="DB GUI"
                onClick={() => onMenuItemClick(<DBGUI />)}
              />
            </ul>
          </nav>
        </div>
        <UserSearchPage />
      </div>
    </div>
  );
};

const MenuItem: React.FC<{
  text: string;
  onClick?: () => void;
  link?: string;
}> = ({ text, onClick, link }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li className={styles.menuitem} onClick={onClick}>
      <span className={styles.menuitemicon}></span>
      {link ? (
        <Link href={link} className={styles.atagmenuitem}>
          {text}
        </Link>
      ) : (
        <span>{text}</span>
      )}
    </li>
  );
};

export default AdminSidebar;
