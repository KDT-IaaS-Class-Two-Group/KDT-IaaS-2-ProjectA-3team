// UserListPanel.tsx
import React from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";
import SearchBar from "../../molecule/nav/search_bar"; // SearchBar를 임포트

interface UserListPanelProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  users: { user_id: string; username: string; isFollowing: boolean }[];
  onUserClick: (userId: string, isFollowing: boolean) => void;
}

const UserListPanel: React.FC<UserListPanelProps> = ({
  searchTerm,
  onSearchChange,
  onSearchKeyDown,
  users,
  onUserClick,
}) => (
  <div className={styles.userlistcontainer}>
    <div className={styles.userlisttitle}>User List</div>

    {/* SearchBar 컴포넌트를 사용하여 검색 기능을 구현 */}
    <SearchBar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      onSearchKeyDown={onSearchKeyDown}
    />

    <ul className={styles.userlist}>
      {users.length > 0 ? (
        users.map((user) => (
          <li
            key={user.user_id}
            className={styles.userlistitem}
            onClick={() => onUserClick(user.user_id, user.isFollowing)}
          >
            {user.username} - {user.isFollowing ? "언팔로우" : "팔로우"}
          </li>
        ))
      ) : (
        <li>No users found</li>
      )}
    </ul>
  </div>
);

export default UserListPanel;
