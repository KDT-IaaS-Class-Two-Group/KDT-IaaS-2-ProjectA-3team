import React, { useState, useEffect } from "react";
import { User } from "../../organism/follow_List/interface/usertype";
import { fetchFollowingList } from "../../organism/follow_List/service/fetchFollowingList";
import { useLoading } from "../../organism/follow_List/hook/useLoading";
import Ul from "../../atom/ul/ul";  // 경로를 실제 위치에 맞게 수정
import Li from "../../atom/li/li";  // 경로를 실제 위치에 맞게 수정


const FollowingListPage: React.FC = () => {
  const { loading, setLoading } = useLoading();
  const [followingList, setFollowingList] = useState<User[]>([]);

  useEffect(() => {
    const loadFollowingList = async () => {
      setLoading(true);
      try {
        const data = await fetchFollowingList();
        setFollowingList(data);
      } catch (error) {
        console.error("Error occurred while fetching following list", error);
      } finally {
        setLoading(false);
      }
    };

    loadFollowingList();
  }, [setLoading]);

  return (
    <div>
      <h1>팔로우 중인 사용자 목록</h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <Ul ul_style={""}>
          {followingList.map((user: User) => (
            <Li key={user.user_id} li_style={""}>
              {user.username} ({user.email})
            </Li>
          ))}
        </Ul>
      )}
    </div>
  );
};

export default FollowingListPage;
