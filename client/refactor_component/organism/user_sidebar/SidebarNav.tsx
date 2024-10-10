// molecule/sidebar/SidebarNav.tsx
import React from "react";
import MenuItem from "client/components/MenuItem/MenuItem"; // Assume MenuItem is in the correct path
import ProjectCheckComponent from "client/components/__userHome/project";
import NoticeMainPage from "client/pages/noticeMain";
import UserPersonal from "client/refactor_component/template/profile_user/user_profile";
import * as styles from "../../../styles/sidebar/SidebarStyles.css"; // Assume the correct path

interface SidebarNavProps {
  onMenuItemClick: (component: React.ReactNode) => void;
  sessionData: { user_id: string; role_name: string } | null;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  onMenuItemClick,
  sessionData,
}) => {
  return (
    <ul className={styles.menulist}>
      <MenuItem
        text="프로젝트 조회"
        onClick={() =>
          onMenuItemClick(
            <ProjectCheckComponent
              sessionData={sessionData}
              onMenuItemClick={onMenuItemClick}
            />
          )
        }
      />
      <MenuItem
        text="칸반보드"
        onClick={() => onMenuItemClick(<KanbanBoard />)}
      />
      <MenuItem
        text="게시판"
        onClick={() => onMenuItemClick(<NoticeMainPage />)}
      />
      <MenuItem
        text="개인정보 조회"
        onClick={() => onMenuItemClick(<UserPersonal />)}
      />
    </ul>
  );
};
const KanbanBoard: React.FC = () => <div>칸반보드 컴포넌트</div>;
export default SidebarNav;
