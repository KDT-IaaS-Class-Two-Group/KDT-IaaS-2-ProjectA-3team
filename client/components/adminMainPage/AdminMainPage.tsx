import Link from "next/link";
import {
  mainpagecontainer,
  contentcontainer,
  section,
  projectSection,
  buttonSection,
  title,
  cardHeader,
  cardContent,
  proceedingButton,
  allTasksButton,
  maincontentcontainer,
} from "client/styles/admin/admindashboard.css";
import Project from "client/components/auth_Component/project/project";
import PendingUser from "client/components/MemberVerification/utils/PendingUser";
import StateUsers from "client/components/StateUsers";
import Attendance from "client/components/attendance";
import NoticeBoard from "client/components/Notice/NoticeBoard";
import DatabaseGUI from "client/components/DatabaseGuI";
import { attendanceSection } from "client/styles/admin/workAttendance/workattendance.css";
import { noticeBoardSection } from "client/styles/admin/noticeBoard/noticeboard.css";
import { databaseGUISection } from "client/styles/admin/databaseGUI/databasegui.css";
import { requestSection } from "client/styles/admin/requests/requests.css";
import PendingUsersList from "client/components/PendingUsersList";
import CheckUsersCount from "client/components/checktest";

const AdminMainContent: React.FC = () => {
  return (
    <div className={maincontentcontainer}>
      <div className={`${section} ${projectSection}`}>
        <div className={cardContent}>
          <Project />
        </div>
      </div>

      <div className={`${section} ${requestSection}`}>
        <div className={cardHeader}>User Requests</div>
        <CheckUsersCount />
      </div>

      <div className={`${section} ${requestSection}`}>
        <div className={cardHeader}>User Sign up Management</div>
        <PendingUsersList />
      </div>

      <div className={`${section} ${attendanceSection}`}>
        <div className={cardHeader}>Work Attendance</div>
        <div className={cardContent}>
          <Attendance />
        </div>
      </div>

      <div className={`${section} ${noticeBoardSection}`}>
        <div className={cardHeader}>Notice Board</div>
        <div className={cardContent}>
          <NoticeBoard />
        </div>
      </div>

      <div className={`${section} ${databaseGUISection}`}>
        <div className={cardHeader}>Database GUI</div>
        <div className={cardContent}>
          <DatabaseGUI />
        </div>
      </div>
    </div>
  );
};
export default AdminMainContent;
