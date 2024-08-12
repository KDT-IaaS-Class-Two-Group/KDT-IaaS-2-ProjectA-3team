import React, { useState } from "react";

const FollowPage: React.FC = () => {
  interface User {
    user_id: string;
    username: string;
    email: string;
    isFollowing: boolean; // 이 속성은 팔로우 상태를 나타냅니다.
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]); // User[] 타입을 명시합니다.
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/getUser/search?query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data: User[] = await response.json(); // 데이터를 User[] 타입으로 변환합니다.
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
    try {
      const response = await fetch(
        `http://localhost:3001/api/getUser/${isFollowing ? "unfollow" : "follow"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            followerId: "currentUserId", // 현재 로그인한 사용자의 ID를 사용해야 합니다
            followingId: userId,
          }),
        }
      );

      if (response.ok) {
        handleSearch(); // 팔로우/언팔로우 후 목록을 다시 로드합니다.
      } else {
        console.error("Failed to follow/unfollow user");
      }
    } catch (error) {
      console.error("Error occurred while following/unfollowing user", error);
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
