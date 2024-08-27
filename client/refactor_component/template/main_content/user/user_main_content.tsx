import MainContentProps from "client/refactor_component/organism/main_content/props/main_content.props";
import NoticeBoardSection from "client/refactor_component/organism/main_content/utils/sections/common/notice_board_section/notice_board_section";
import ClockInButtonSection from "client/refactor_component/organism/main_content/utils/sections/user/clock_in_button_section/clock_in_button_section";
import FollowingUserListSection from "client/refactor_component/organism/main_content/utils/sections/user/following_user_list_section/following_user_list_section";
import KanbanBoardSection from "client/refactor_component/organism/main_content/utils/sections/user/kanban_board_section/kanban_board_section";
import { maincontentcontainer } from "client/styles/admin/admindashboard.css";

const UserMainContent: React.FC<MainContentProps> = ({
  onClick,
  userId,
  followingUsers,
}) => {
  return (
    <div className={maincontentcontainer}>
      <FollowingUserListSection
        onClick={onclick}
        followingUsers={followingUsers}
      />
      <KanbanBoardSection onClick={onclick} userId={userId} />
      <NoticeBoardSection onClick={onclick} />
      <ClockInButtonSection onClick={onclick} userId={userId} />
    </div>
  );
};

export default UserMainContent;
