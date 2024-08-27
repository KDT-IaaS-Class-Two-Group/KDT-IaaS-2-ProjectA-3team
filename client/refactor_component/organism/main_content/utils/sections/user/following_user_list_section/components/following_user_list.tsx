import { FollowingUserProps } from "client/refactor_component/organism/main_content/props/main_content.props";
import { followerlist } from "client/styles/notice/notice.css";
import { favsection, usersection } from "client/styles/users/userdashboard.css";
import React from "react";

interface FollowingUserListProps {
  followingUsers: FollowingUserProps[];
}

const FollowingUserList: React.FC<FollowingUserListProps> = ({
  followingUsers,
}) => {
  return (
    <>
      <div className={`${usersection} ${favsection}`}>
        <div className={followerlist}>
          {followingUsers[0]?.username || "No followed users"}
        </div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={followerlist}>
          {followingUsers[1]?.username || "No followed users"}
        </div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={followerlist}>
          {followingUsers[2]?.username || "No followed users"}
        </div>
      </div>
    </>
  );
};

export default FollowingUserList;
