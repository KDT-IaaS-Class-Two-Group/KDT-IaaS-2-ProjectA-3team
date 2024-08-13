import React from "react";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import { UserSearch } from "../common/nav/UserSearch";
import Logo from "../common/logo/Logo";
import UserMainContent from "../userMainPage/UserMainPage";
import NoticeMainPage from "../../pages/noticeMain";
import UserPersonal from "../users/userpersonal";
import { useEffect, useState } from "react";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import Link from "next/link";
import { tdn } from "client/styles/templatebutton.css";
import ProjectCheckComponent from "../__userHome/project";
interface UserSidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
  sessionData: SessionData | null;
}

interface SessionData {
  user_id: string;
  role_name: string;
}

const UserSidebar: React.FC<UserSidebarProps> = ({
  onMenuItemClick,
  sessionData,
}) => {
  const handleMenuItemClick = (component: React.ReactNode) => {
    onMenuItemClick(component);
  };

  const handleLogoClick = () => {
    onMenuItemClick(<UserMainContent onclick={() => {}} />);
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
                    <ProjectCheckComponent sessionData={sessionData} />
                  )
                }
              />
              <MenuItem
                text="칸반보드"
                onClick={() => handleMenuItemClick(<KanbanBoard />)}
              />
              <MenuItem text="게시판" link="/noticeMain" />
              <MenuItem
                text="개인정보 조회"
                onClick={() => handleMenuItemClick(<UserPersonal />)}
              />
            </ul>
          </nav>
        </div>
        <UserSearch />
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
