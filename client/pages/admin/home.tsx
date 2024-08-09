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
<<<<<<< HEAD
import AdminSidebar from "../../components/SideBar/AdminSidebar";
=======
import CheckUsersCount from "client/components/checktest";
import PendingUsersComponent from "client/components/test";
import PendingUsersList from "client/components/PendingUsersList";
>>>>>>> 59ffb7664203e0e4e8c452501bddd114071cb1b5
fullRowSection;
const Dash: React.FC = () => {
  return (
    <div className={mainpagecontainer}>
      <AdminSidebar />
      <div className={contentcontainer}>
        <div className={`${section} ${fullRowSection}`}>
          <div className={titlecontainer}>
            <p className={titletext}>hello 아무이름</p>
            <p className={admintext}>권한</p>
          </div>
        </div>
        <div className={`${section} ${projectSection}`}>
          <div className={cardContent}>
            <Project projects={[]} />
          </div>
        </div>
        <div className={`${section} ${requestSection}`}>
          <div className={cardHeader}>Requests</div>
          <PendingUsersList />
        </div>
        <div className={`${section} ${requestSection}`}>
          <div className={cardHeader}>User Management</div>
          <CheckUsersCount />
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
