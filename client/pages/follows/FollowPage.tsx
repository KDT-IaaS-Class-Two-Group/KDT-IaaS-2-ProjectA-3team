import React, { useState, useEffect } from "react";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
interface User {
  user_id: string;
  username: string;
  email: string;
  isFollowing: boolean;
}

interface SessionData {
  user_id: string;
  role_name: string;
}

const FollowPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    // 세션 데이터를 가져와서 설정합니다.
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setSessionData(data.session);
          console.log("Session data fetched:", data.session);
        } else {
          console.error("Failed to fetch session data", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch session data", error);
      }
    };

    fetchSessionData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/getUser/search?query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 세션 기반 인증을 위한 쿠키 포함
        }
      );

      if (response.ok) {
        const data: User[] = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error occurred while fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string, isFollowing: boolean) => {
    if (!sessionData) {
      console.error("Session data is not available");
      return;
    }

    const action = isFollowing ? "unfollow" : "follow";
    const confirmMessage = isFollowing
      ? "팔로우를 취소하시겠습니까?"
      : "팔로우 하시겠습니까?";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/getUser/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 세션 기반 인증을 위한 쿠키 포함
        body: JSON.stringify({
          followerId: sessionData.user_id, // 세션에서 가져온 현재 사용자 ID
          followingId: userId,
        }),
      });

      if (response.ok) {
        handleSearch(); // 팔로우/언팔로우 후 목록을 다시 로드합니다.
      } else {
        console.error(`Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`Error occurred while trying to ${action} user`, error);
    }
  };

  return (
    <div>
      <h1>사용자 검색 및 팔로우</h1>
      <input
        type="text"
        placeholder="사용자 이름 또는 ID 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "검색 중..." : "검색"}
      </button>

      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <span>
              {user.username} ({user.email})
            </span>
            <button
              onClick={() => handleFollow(user.user_id, user.isFollowing)}
            >
              {user.isFollowing ? "언팔로우" : "팔로우"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowPage;
