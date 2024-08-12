import React, { useEffect, useState } from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

export const UserSearch: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // 전체 사용자 목록
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // 필터링된 사용자 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [currentUserRole, setCurrentUserRole] = useState<string>("employee"); // 현재 사용자의 역할, 기본값을 'employee'로 설정

  useEffect(() => {
    // 현재 사용자의 권한 가져오기
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUser/role", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰이 필요할 경우 추가
          },
          credentials: "include", // 쿠키를 포함해야 하는 경우
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUserRole(data.role || "employee"); // 현재 사용자의 역할을 설정, 실패시 'employee'로 설정
        } else {
          console.error("사용자 권한 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    // 전체 사용자 목록 가져오기
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUser/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰이 필요할 경우 추가
          },
          credentials: "include", // 쿠키를 포함해야 하는 경우
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data); // 전체 사용자 목록을 저장
          setFilteredUsers(data.slice(0, 10)); // 초기 상태에서 상위 10명의 유저만 필터링된 사용자 목록에 설정
        } else {
          console.error("사용자 데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchUserRole(); // 컴포넌트가 마운트될 때 사용자의 권한 정보를 가져옴
    fetchUsers(); // 컴포넌트가 마운트될 때 사용자 데이터를 가져옴
  }, []);

  // 역할 우선순위를 정의한 객체
  const roleHierarchy: { [key: string]: number } = {
    admin: 1,
    leader: 2,
    sub_admin: 3,
    employee: 4,
  };

  // 역할을 비교하여 우선순위 차이를 반환하는 함수
  const compareRoles = (role1: string, role2: string) => {
    return (roleHierarchy[role1] || 100) - (roleHierarchy[role2] || 100);
  };

  // 검색어 입력 처리 함수
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 엔터키를 눌렀을 때 실행되는 함수
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() === "") {
        setFilteredUsers([]); // 검색어가 비어있다면 결과를 비웁니다.
      } else {
        const filtered = users.filter((user) => {
          const userRole = user.role_name || "employee"; // 사용자의 역할을 가져옵니다. 역할이 없다면 기본값은 employee
          const comparisonResult = compareRoles(currentUserRole, userRole);

          return (
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
            comparisonResult <= 0
          ); // 권한이 자신보다 높은 사람은 필터링
        });
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
        {filteredUsers.length > 0
          ? filteredUsers.map((user) => (
              <li key={user.user_id} className={styles.userlistitem}>
                {user.username}
              </li>
            ))
          : searchTerm && <li>No users found</li>}
      </ul>
    </div>
  );
};
