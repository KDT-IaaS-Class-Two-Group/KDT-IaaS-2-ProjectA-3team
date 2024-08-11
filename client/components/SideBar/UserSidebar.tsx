import React from "react";
import * as styles from "../../styles/sidebar/SidebarStyles.css";
import { UserSearch } from "../common/nav/UserSearch";
import Logo from "../common/logo/Logo";
import UserMainContent from "../userMainPage/UserMainPage";
import NoticeMainPage from "../Notice/noticeMain";
import UserPersonal from "../users/userpersonal";

interface UserSidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ onMenuItemClick }) => {
  // 메뉴 아이템 클릭 시 호출되는 함수
  const handleMenuItemClick = (component: React.ReactNode) => {
    onMenuItemClick(component);
  };

  // 로고 클릭 시 호출되는 함수
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
            <span className={styles.profilename}>matomabo</span>
            <span className={styles.menuicon}>⋮</span>
          </div>
          <nav>
            <ul className={styles.menulist}>
              <MenuItem
                text="프로젝트 조회"
                onClick={() => handleMenuItemClick(<ProjectView />)}
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
        <UserSearch />
      </div>
    </div>
  );
};

// 메뉴 항목 컴포넌트
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
const ProjectView: React.FC = () => <div>프로젝트 조회 컴포넌트</div>;
const KanbanBoard: React.FC = () => <div>칸반보드 컴포넌트</div>;
const NoticeBoard: React.FC = () => <div>게시판 컴포넌트</div>;
const UserProfile: React.FC = () => <div>개인정보 조회 컴포넌트</div>;
export default UserSidebar;
