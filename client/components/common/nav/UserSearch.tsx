import React, { useEffect, useState } from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

export const UserSearch: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // 전체 사용자 목록
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // 필터링된 사용자 목록
  const [searchTerm, setSearchTerm] = useState(''); // 검색어

  useEffect(() => {
    // 사용자 목록을 가져오는 함수
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/getUser/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data); // 전체 사용자 목록을 저장
        } else {
          console.error('사용자 데이터를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchUsers(); // 컴포넌트가 마운트될 때 사용자 데이터를 가져옴
  }, []);

  // 검색어 입력 처리 함수
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 엔터키를 눌렀을 때 실행되는 함수
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchTerm.trim() === '') {
        setFilteredUsers([]); // 검색어가 비어있다면 결과를 비웁니다.
      } else {
        const filtered = users.filter(user =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered); // 필터링된 사용자 목록을 업데이트
      }
    }
  };

  return (
    <div className={styles.userlistcontainer}>
      <div className={styles.userlisttitle}>User List</div>
      <div className={styles.searchcontainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchinput}
          value={searchTerm}
          onChange={handleSearchChange} // 검색어가 입력될 때 상태 업데이트
          onKeyDown={handleKeyDown} // 엔터키를 눌렀을 때 필터링 동작 실행
        />
      </div>
      <ul className={styles.userlist}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <li key={user.user_id} className={styles.userlistitem}>
              {user.username}
            </li>
          ))
        ) : (
          searchTerm && <li>No users found</li>
        )}
      </ul>
    </div>
  );
};
