import React, { useEffect, useState } from "react";

const FollowingListPage: React.FC = () => {
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFollowingList = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/getUser/followingList`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
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
          {followingList.map((user) => (
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
