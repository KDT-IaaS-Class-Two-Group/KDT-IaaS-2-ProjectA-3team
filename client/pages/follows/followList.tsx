import React, { useState, useEffect } from "react";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM"; // 필요한 경우 경로를 수정하세요.

interface User {
  user_id: string;
  username: string;
  email: string;
}

const FollowingListPage: React.FC = () => {
  const [followingList, setFollowingList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFollowingList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/getUser/followingList`,
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
          setFollowingList(data);
        } else {
          console.error("Failed to fetch following list");
        }
      } catch (error) {
        console.error("Error occurred while fetching following list", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingList();
  }, []);

  return (
    <div>
      <h1>팔로우 중인 사용자 목록</h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul>
          {followingList.map((user: User) => (
            <li key={user.user_id}>
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowingListPage;
