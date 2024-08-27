import { useState, useEffect } from "react";
import FollowingUserProps from "../props/following_user.props";
import fetchSessionData from "../service/fetch_session_data";
import fetchFollowingList from "../service/fetch_following_user";

const useFollowingList = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [followingUsers, setFollowingUsers] = useState<FollowingUserProps[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSessionData = async () => {
      const sessionData = await fetchSessionData();
      if (sessionData) {
        setUserId(sessionData.user_id);
        const followingData = await fetchFollowingList(setLoading);
        setFollowingUsers(followingData);
      }
    };

    loadSessionData();
  }, []);

  return {
    userId,
    followingUsers,
    loading,
  };
};

export default useFollowingList;
