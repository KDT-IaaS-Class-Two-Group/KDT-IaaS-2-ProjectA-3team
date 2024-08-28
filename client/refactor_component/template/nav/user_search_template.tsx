// UserSearchPage.tsx
import React, { useEffect, useState } from 'react';
import UserListPanel from '../../organism/nav/user_list';

const UserSearchPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState<string>('employee');
  const [sessionData, setSessionData] = useState<{ user_id: string } | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUser/session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setCurrentUserRole(data.role || "employee"); // 현재 사용자의 역할을 설정, 실패시 'employee'로 설정
          setSessionData(data.session); // 세션 데이터 저장
        } else {
          console.error("사용자 권한 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/getUser/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 쿠키를 포함해야 하는 경우
        });

        if (response.ok) {
          const data = await response.json();
          // 여기서 사용자가 팔로우하고 있는지 여부를 서버에서 받아와 설정
          const followingResponse = await fetch(
            "http://localhost:3001/getUser/followingList",
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
            const followingIds = new Set(
              followingData.map((user: any) => user.user_id)
            );
            const usersWithFollowing = data.map((user: any) => ({
              ...user,
              isFollowing: followingIds.has(user.user_id),
            }));
            setUsers(usersWithFollowing);
            setFilteredUsers(usersWithFollowing.slice(0, 10));
          } else {
            console.error("팔로잉 데이터를 가져오는 데 실패했습니다.");
          }
        } else {
          console.error("사용자 데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchSessionData(); // 컴포넌트가 마운트될 때 사용자의 권한 정보를 가져옴
    fetchUsers(); // 컴포넌트가 마운트될 때 사용자 데이터를 가져옴
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const roleHierarchy: { [key: string]: number } = {
    admin: 1,
    leader: 2,
    sub_admin: 3,
    employee: 4,
  };
  const compareRoles = (role1: string, role2: string) => {
    return (roleHierarchy[role1] || 100) - (roleHierarchy[role2] || 100);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() === "") {
        setFilteredUsers([]);
      } else {
        const filtered = users.filter((user) => {
          const userRole = user.role_name || "employee";
          const comparisonResult = compareRoles(currentUserRole, userRole);

          return (
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
            comparisonResult <= 0
          );
        });
        setFilteredUsers(filtered);
      }
    }
  };

  const handleUserClick = async (userId: string, isFollowing: boolean) => {
    const confirmMessage = isFollowing
      ? "언팔로우 하겠습니까?"
      : "팔로우 하겠습니까?";
    const confirmFollow = window.confirm(confirmMessage);
    if (confirmFollow) {
      try {
        const response = await fetch(
          `http://localhost:3001/getUser/${isFollowing ? "unfollow" : "follow"}`,
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
          alert(isFollowing ? "언팔로우 성공!" : "팔로우 성공!");
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id === userId
                ? { ...user, isFollowing: !isFollowing }
                : user
            )
          );
        } else {
          alert(isFollowing ? "언팔로우 실패" : "팔로우 실패");
        }
      } catch (error) {
        console.error("요청 중 에러 발생:", error);
        alert("요청 중 에러가 발생했습니다.");
      }
    }
  };

  return (
    <div className="user-search-page">
      <UserListPanel
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchKeyDown={handleKeyDown}
        users={filteredUsers}
        onUserClick={handleUserClick}
      />
    </div>
  );
};

export default UserSearchPage;
