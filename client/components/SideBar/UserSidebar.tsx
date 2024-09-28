import { useState, useEffect } from "react";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import UserSearchPage from "client/refactor_component/template/nav/user_search_template";
import Logo from "../common/logo/Logo";
import UserMainContent from "../../refactor_component/template/main_content/user/user_main_content";
import NoticeMainPage from "../../pages/noticeMain";
import UserPersonal from "client/refactor_component/template/profile_user/user_profile";
// "../../refactor_component/template/profile_user/UserProfile";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import Link from "next/link";

import { tdn } from "client/styles/templatebutton.css";
// import ProjectCheckComponent from "client/refactor_component/template/project_check/project_check_pate";
import ProjectCheckComponent from "client/components/__userHome/project";

interface UserSidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}

interface SessionData {
  user_id: string;
  role_name: string;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ onMenuItemClick }) => {
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

  const handleMenuItemClick = (component: React.ReactNode) => {
    setCurrentComponent(component);
    onMenuItemClick(component);
  };

  const handleLogoClick = () => {
    const userMainContentComponent = (
      <UserMainContent onclick={handleMenuItemClick} />
    );
    setCurrentComponent(userMainContentComponent);
    onMenuItemClick(userMainContentComponent);
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
                text="프로젝트 조회"
                onClick={() =>
                  handleMenuItemClick(
                    <ProjectCheckComponent
                      sessionData={sessionData}
                      onMenuItemClick={onMenuItemClick}
                    />
                  )
                }
              />
              <MenuItem
                text="칸반보드"
                onClick={() => handleMenuItemClick(<KanbanBoard />)}
              />
              <MenuItem
                text="게시판"
                onClick={() => handleMenuItemClick(<NoticeMainPage />)}
              />
              <MenuItem
                text="개인정보 조회"
                onClick={() => handleMenuItemClick(<UserPersonal />)}
              />
            </ul>
          </nav>
        </div>
        <UserSearchPage />
      </div>
    </div>
  );
};

// 메뉴 항목 컴포넌트
const MenuItem: React.FC<{
  text: string;
  onClick?: () => void;
  link?: string;
}> = ({ text, onClick, link }) => {
  if (link) {
    return (
      <li className={styles.menuitem}>
        <span className={styles.menuitemicon}></span>
        <Link href={link} className={styles.atagmenuitem}>
          {text}
        </Link>
      </li>
    );
  } else {
    return (
      <li className={styles.menuitem} onClick={onClick}>
        <span className={styles.menuitemicon}></span>
        <span>{text}</span>
      </li>
    );
  }
};

const ProjectView: React.FC = () => <div>프로젝트 조회 컴포넌트</div>;
const KanbanBoard: React.FC = () => <div>칸반보드 컴포넌트</div>;
const NoticeBoard: React.FC = () => <div>게시판 컴포넌트</div>;
const UserProfile: React.FC = () => <div>개인정보 조회 컴포넌트</div>;

export default UserSidebar;
