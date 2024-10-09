import AttendanceSection from "client/refactor_component/organism/main_content/utils/sections/admin/attendance_section/attendance_section";
import DatabaseGUISection from "client/refactor_component/organism/main_content/utils/sections/admin/database_gui_section/database_gui_section";
import AdminNoticeBoardSection from "client/refactor_component/organism/main_content/utils/sections/admin/admin_notice_board_section/admin_notice_board_section";
import ProjectSection from "client/refactor_component/organism/main_content/utils/sections/admin/project_section/project_section";
import UserPendingSection from "client/refactor_component/organism/main_content/utils/sections/admin/user_pending_section/user_pending_section";
import UserRequestSection from "client/refactor_component/organism/main_content/utils/sections/admin/user_request_section/user_request_section";
import { maincontentcontainer } from "client/styles/admin/admindashboard.css";

const AdminMainContent: React.FC<{
  onclick: (component: React.ReactNode) => void;
}> = ({ onclick }) => {
  return (
    <div className={maincontentcontainer}>
      <ProjectSection onClick={onclick} />
      <UserRequestSection onClick={onclick} />
      <UserPendingSection onClick={onclick} /> {/* 수정된 컴포넌트 사용 */}
      <AttendanceSection onClick={onclick} />
      <AdminNoticeBoardSection onClick={onclick} />
      <DatabaseGUISection onClick={onclick} />
    </div>
  );
};

export default AdminMainContent;
