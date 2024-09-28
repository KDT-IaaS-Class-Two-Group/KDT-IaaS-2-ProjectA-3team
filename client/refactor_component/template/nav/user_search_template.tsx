import React, { useEffect, useState } from "react";
import * as styles from "../../../styles/sidebar/SidebarStyles.css";

const UserSearchPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // 전체 사용자 목록
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // 필터링된 사용자 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [currentUserRole, setCurrentUserRole] = useState<string>("employee"); // 현재 사용자의 역할, 기본값을 'employee'로 설정
  const [sessionData, setSessionData] = useState<{ user_id: string } | null>(null);

  // 역할 계층 설정
  const roleHierarchy: { [key: string]: number } = {
    admin: 1,
    leader: 2,
    sub_admin: 3,
    employee: 4,
  };

  // 역할을 비교하는 함수
  const compareRoles = (role1: string, role2: string) => {
    return (roleHierarchy[role1] || 100) - (roleHierarchy[role2] || 100);
  };

  // 세션 데이터를 가져오는 함수
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("http://localhost:3001/login/session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUserRole(data.role || "employee"); // 현재 사용자의 역할 설정
          setSessionData(data.session); // 세션 데이터 저장
        } else {
          console.error("사용자 권한 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("세션 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    // 사용자 목록을 가져오는 함수
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          const followingResponse = await fetch(
            "http://localhost:3001/user/follow/followingList",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (followingResponse.ok) {
            const followingData = await followingResponse.json();
            const followingIds = new Set(followingData.map((user: any) => user.user_id));

            const usersWithFollowing = data.map((user: any) => ({
              ...user,
              isFollowing: followingIds.has(user.user_id),
            }));

            setUsers(usersWithFollowing); // 전체 사용자 목록 설정
            setFilteredUsers(usersWithFollowing.slice(0, 10)); // 처음 10명의 사용자 필터링
          } else {
            console.error("팔로잉 데이터를 가져오는 데 실패했습니다.");
          }
        } else {
          console.error("사용자 데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("사용자 데이터를 가져오는 중 에러 발생:", error);
      }
    };

    fetchSessionData(); // 세션 데이터 가져오기
    fetchUsers(); // 사용자 목록 가져오기
  }, []);

  // 검색어 입력 처리
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 검색 시 엔터키 처리
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() === "") {
        setFilteredUsers([]); // 검색어가 없으면 목록 초기화
      } else {
        const filtered = users.filter((user) => {
          const userRole = user.role_name || "employee";
          const comparisonResult = compareRoles(currentUserRole, userRole);

          // 검색어가 포함되고, 현재 사용자보다 낮거나 같은 권한의 사용자만 필터링
          return (
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
            comparisonResult >= 0 // 현재 사용자의 권한보다 낮거나 같은 사용자만 포함
          );
        });
        setFilteredUsers(filtered); // 필터링된 사용자 목록 설정
      }
    }
  };

  // 팔로우/언팔로우 클릭 처리
  const handleUserClick = async (userId: string, isFollowing: boolean) => {
    const confirmMessage = isFollowing ? "언팔로우 하겠습니까?" : "팔로우 하겠습니까?";
    const confirmFollow = window.confirm(confirmMessage);

    if (confirmFollow) {
      try {
        const response = await fetch(
          `http://localhost:3001/user/follow/${isFollowing ? "unfollow" : "follow"}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              followerId: sessionData?.user_id,
              followingId: userId,
            }),
          }
        );

        if (response.ok) {
          // 상태 업데이트: 팔로우 상태 변경
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id === userId
                ? { ...user, isFollowing: !isFollowing } // 팔로우 상태 반전
                : user
            )
          );

          // 필터링된 사용자 목록에서도 동일하게 상태 변경
          setFilteredUsers((prevFilteredUsers) =>
            prevFilteredUsers.map((user) =>
              user.user_id === userId
                ? { ...user, isFollowing: !isFollowing }
                : user
            )
          );

          alert(isFollowing ? "언팔로우 성공!" : "팔로우 성공!");
        } else {
          alert(isFollowing ? "언팔로우 실패" : "팔로우 실패");
        }
      } catch (error) {
        console.error("팔로우/언팔로우 처리 중 에러 발생:", error);
        alert("팔로우/언팔로우 처리 중 에러가 발생했습니다.");
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
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <ul className={styles.userlist}>
        {filteredUsers.length > 0
          ? filteredUsers.map((user) => (
              <li
                key={user.user_id}
                className={styles.userlistitem}
                onClick={() => handleUserClick(user.user_id, user.isFollowing)}
              >
                {user.username} - {user.isFollowing ? "언팔로우" : "팔로우"}
              </li>
            ))
          : searchTerm && <li>No users found</li>}
      </ul>
    </div>
  );
};

export default UserSearchPage;
