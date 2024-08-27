import { followerlist } from "client/styles/notice/notice.css";
import { favsection, usersection } from "client/styles/users/userdashboard.css";
import React, { Fragment } from "react";
import FollowingUserProps from "../props/following_user.props";

interface FollowingUserListProps {
  followingUsers: FollowingUserProps[];
}

const FollowingUserList: React.FC<FollowingUserListProps> = ({
  followingUsers = [],
}) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default FollowingUserList;
