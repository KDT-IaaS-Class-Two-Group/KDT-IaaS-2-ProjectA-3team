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
} from "client/styles/admin/admindashboard.css";
import Project from "client/components/auth_Component/project/project";
import PendingUser from "client/components/MemberVerification/utils/PendingUser";
import StateUsers from "client/components/StateUsers";
import Attendance from "client/components/attendance";
import NoticeBoard from "client/components/Notice/NoticeBoard";
import DatabaseGUI from "client/components/DatabaseGuI";
import {
  admintext,
  basetext,
  fullRowSection,
  titlecontainer,
  titletext,
} from "client/styles/admin/greet/greet.css";
import { attendanceSection } from "client/styles/admin/workAttendance/workattendance.css";
import { noticeBoardSection } from "client/styles/admin/noticeBoard/noticeboard.css";
import { databaseGUISection } from "client/styles/admin/databaseGUI/databasegui.css";
import { requestSection } from "client/styles/admin/requests/requests.css";
import AdminSidebar from "../../components/SideBar/AdminSidebar";
import MainHeader from "client/components/common/header/mainheader";
fullRowSection;
const Dash: React.FC = () => {
  return (
    <div className={mainpagecontainer}>
      <AdminSidebar />
      <div className={contentcontainer}>
        <MainHeader></MainHeader>
        <div className={`${section} ${projectSection}`}>
          <div className={cardContent}>
            <Project />
          </div>
        </div>
        <div className={`${section} ${requestSection}`}>
          <div className={cardHeader}>Requests</div>
          <div className={cardContent}>Requested by 3 users</div>
        </div>
        <div className={`${section} ${requestSection}`}>
          <div className={cardHeader}>User Management</div>
          <div className={cardContent}>Authorize 5 users</div>
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
    </div>
  );
};

export default Dash;
