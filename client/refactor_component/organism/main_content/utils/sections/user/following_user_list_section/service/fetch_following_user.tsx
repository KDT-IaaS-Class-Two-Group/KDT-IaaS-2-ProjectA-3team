import FollowingUserProps from "../props/following_user.props";
const fetchFollowingList = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<FollowingUserProps[]> => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:3001/user/follow/followingList",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      const data: FollowingUserProps[] = await response.json();
      return data;
    } else {
      console.error("Failed to fetch following list");
      return [];
    }
  } catch (error) {
    console.error("Error occurred while fetching following list", error);
    return [];
  } finally {
    setLoading(false);
  }
};

export default fetchFollowingList;
