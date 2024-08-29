/**
 * @file SidebarNav.tsx
 * @brief 사이드바 내비게이션 컴포넌트 파일
 * @details 이 파일은 사이드바 내비게이션을 담당하는 `SidebarNav` 컴포넌트를 정의한다.
 *          `SidebarNav` 컴포넌트는 메뉴 항목을 포함하고, 각 메뉴 항목 클릭 시 적절한 컴포넌트를 렌더링하는 기능을 제공한다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import React from "react";
import MenuItem from "client/components/MenuItem/MenuItem"; // MenuItem 컴포넌트 가져오기
// import ProjectCheckComponent from "client/components/__userHome/project"; // 프로젝트 조회 컴포넌트 가져오기
import ProjectCheckComponent from "client/refactor_component/template/project_check/project_check_pate";
import NoticeMainPage from "client/pages/noticeMain"; // 게시판 페이지 가져오기
import UserPersonal from "client/refactor_component/template/profile_user/user_profile"; // 사용자 개인정보 조회 컴포넌트 가져오기
import * as styles from "../../../styles/sidebar/SidebarStyles.css"; // 스타일 파일 가져오기

/**
 * @brief 사이드바 내비게이션 컴포넌트
 * @details 사이드바의 내비게이션 메뉴를 렌더링하며, 각 메뉴 항목 클릭 시 적절한 컴포넌트를 렌더링하도록 처리한다.
 * @param {SidebarNavProps} props - 컴포넌트에 전달되는 속성들
 * @param {(component: React.ReactNode) => void} props.onMenuItemClick - 메뉴 항목 클릭 시 호출되는 함수
 * @param {{ user_id: string; role_name: string } | null} props.sessionData - 사용자 세션 데이터 (사용자 ID와 역할 이름 포함)
 * @return {JSX.Element} 사이드바 내비게이션 메뉴를 렌더링하는 JSX 요소
 */
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
        onClick={() => {
          console.log("프로젝트 조회 클릭됨");
          onMenuItemClick(
            <ProjectCheckComponent
              sessionData={sessionData}
              onMenuItemClick={onMenuItemClick}
            />
          );
        }}
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

// 칸반 보드 컴포넌트의 예시
const KanbanBoard: React.FC = () => <div>칸반보드 컴포넌트</div>;

export default SidebarNav;
