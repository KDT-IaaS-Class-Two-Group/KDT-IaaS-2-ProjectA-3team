import { Fragment } from "react";
import React from "react";

import ClockInButtonSection from "client/refactor_component/organism/main_content/utils/sections/user/clock_in_button_section/clock_in_button_section";
import KanbanBoardSection from "client/refactor_component/organism/main_content/utils/sections/user/kanban_board_section/kanban_board_section";
import UserNoticeBoardSection from "client/refactor_component/organism/main_content/utils/sections/user/user_notice_board_section/user_notice_board_section";
import TodoListSection from "client/refactor_component/organism/main_content/utils/sections/user/todo_list/todo_list";
import CalendarSection from "client/refactor_component/organism/main_content/utils/sections/user/calendar_section/calendar_section";
import useFollowingList from "client/refactor_component/organism/main_content/utils/sections/user/following_user_list_section/hook/use_following_list";
import FollowingUserList from "client/refactor_component/organism/main_content/utils/sections/user/following_user_list_section/components/following_user_list";
import UserMainContentProps from "./props/user_main_content.props";

const UserMainContent: React.FC<UserMainContentProps> = ({ onclick }) => {
  const { userId, followingUsers } = useFollowingList();

  return (
    <Fragment>
      <FollowingUserList followingUsers={followingUsers} />
      <KanbanBoardSection onClick={onclick} />
      <UserNoticeBoardSection onClick={onclick} />
      <TodoListSection onClick={onclick} />
      <CalendarSection />
      <ClockInButtonSection userId={userId} />
    </Fragment>
  );
};
export default UserMainContent;
