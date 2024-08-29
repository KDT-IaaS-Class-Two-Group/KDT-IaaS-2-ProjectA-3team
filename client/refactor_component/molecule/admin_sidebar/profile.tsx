/**
 * @file profile.tsx
 * @brief 프로필 및 메뉴 컴포넌트 파일
 * @details 이 파일은 사용자 프로필과 메뉴 목록을 표시하는 `Profile` 컴포넌트를 정의한다.
 *          사용자의 로딩 상태와 사용자 ID를 표시하고, 메뉴 아이템 클릭 시 `onMenuItemClick` 콜백을 호출한다.
 *
 * @author @dalramjwi
 * @date 2024-08-28
 */
import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import MenuList from "./menu_list";

interface ProfileProps {
  loading: boolean;
  userId: string | null;
  onMenuItemClick: (component: React.ReactNode) => void;
}
/**
 * @brief 사용자 프로필 및 메뉴 컴포넌트
 * @details `Profile` 컴포넌트는 사용자 프로필을 표시하고, 사용자 ID가 로딩 중인지 아닌지에 따라
 *          다르게 표시한다. 메뉴 아이템을 클릭하면 `onMenuItemClick` 콜백이 호출된다.
 * @param {ProfileProps} props - 프로필 컴포넌트가 받는 속성들
 * @param {boolean} props.loading - 사용자 프로필이 로딩 중인지 여부
 * @param {string | null} props.userId - 사용자 ID, 로딩 중이 아닐 때 표시될 값
 * @param {Function} props.onMenuItemClick - 메뉴 아이템 클릭 시 호출되는 콜백 함수. 클릭된 메뉴에 해당하는 컴포넌트를 매개변수로 받는다.
 * @return 사용자 프로필과 메뉴 목록을 포함하는 `div` 요소를 반환. 사용자 프로필에는 로딩 상태 및 사용자 ID가 표시되며, 메뉴 목록은 `MenuList` 컴포넌트를 통해 렌더링됨.
 */
const Profile: React.FC<ProfileProps> = ({
  loading,
  userId,
  onMenuItemClick,
}) => (
  <div className={styles.profilecontainer}>
    <div className={styles.profile}>
      <div className={styles.profilecircle}></div>
      {loading ? (
        <span className={styles.profilename}>Loading...</span>
      ) : (
        <span className={styles.profilename}>{userId || "Unknown User"}</span>
      )}
      <span className={styles.menuicon}>⋮</span>
    </div>
    <MenuList onMenuItemClick={onMenuItemClick} />{" "}
    {/* MenuList가 Profile 안에 포함됨 */}
  </div>
);

export default Profile;
