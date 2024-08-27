import React from "react";
export interface FollowingUserProps {
  user_id: string;
  username: string;
  email: string;
}
export default interface MainContentProps {
  onClick: (component: React.ReactNode) => void;
  userId: string;
  followingUsers: FollowingUserProps[];
}
