/**
 * @file sidebar.tsx
 * @brief 사이드바 컴포넌트 파일
 * @details 이 파일은 사이드바의 구조를 정의하며, 로고, 사용자 프로필, 사용자 검색 페이지를 포함한다.
 *          사이드바는 로고 클릭 시 메인 콘텐츠를 변경하고, 사용자 프로필 및 검색 페이지를 렌더링한다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */

import React from "react";
import Logo from "../../template/logo/logo";
import Profile from "./profile";
import UserSearchPage from "../../template/nav/user_search_template";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import AdminMainContent from "client/refactor_component/template/main_content/admin/admin_main_content";

interface SidebarProps {
  onMenuItemClick: (component: React.ReactNode) => void;
  loading: boolean;
  sessionData: { user_id: string } | null;
}

/**
 * @brief 사이드바 컴포넌트
 * @details 사이드바는 로고, 사용자 프로필, 사용자 검색 페이지를 포함하며,
 *          로고 클릭 시 메인 콘텐츠를 변경하는 핸들러를 호출한다.
 * @param {SidebarProps} props - 사이드바 컴포넌트가 받는 속성들
 * @param {Function} props.onMenuItemClick - 메뉴 항목 클릭 시 호출되는 함수
 * @param {boolean} props.loading - 사용자 데이터 로딩 상태
 * @param {Object|null} props.sessionData - 현재 세션의 사용자 데이터
 * @param {string} props.sessionData.user_id - 현재 사용자의 ID
 * @return 사이드바를 렌더링하는 `div` 요소를 반환. 로고, 사용자 프로필, 사용자 검색 페이지를 포함한다.
 */
const Sidebar: React.FC<SidebarProps> = ({
  onMenuItemClick,
  loading,
  sessionData,
}) => {
  return (
    <div className={styles.sidebarcontainer}>
      <Logo
        onClick={() => onMenuItemClick(<AdminMainContent onclick={() => {}} />)}
      />
      <Profile
        loading={loading}
        userId={sessionData?.user_id || null}
        onMenuItemClick={onMenuItemClick}
      />
      <UserSearchPage />
    </div>
  );
};

export default Sidebar;
