import React from "react";
import FollowingUserProps from "../utils/sections/user/following_user_list_section/props/following_user.props";

export default interface MainContentProps {
  onClick: (component: React.ReactNode) => void;
  userId: string;
  followingUsers: FollowingUserProps[];
  issueId?: string; // 선택적으로 issueId를 받을 수 있게 추가
}
