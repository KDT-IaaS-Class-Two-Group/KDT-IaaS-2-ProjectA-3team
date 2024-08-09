import Link from "next/link";
import Sidebar from "./../../components/SideBar/Sidebar";
import {
  mainpagecontainer,
  contentcontainer,
  section,
  fullRowSection,
  projectSection,
  requestSection,
  userManagementSection,
  attendanceSection,
  noticeBoardSection,
  databaseGUISection,
  buttonSection,
  title,
  cardHeader,
  cardContent,
  projectHeader,
  projectTitle,
  proceedingButton,
  allTasksButton,
} from "client/styles/dashboardStyles.css";
import Project from "client/components/auth_Component/project/project";
import PendingUser from "client/components/MemberVerification/utils/PendingUser";
import StateUsers from "client/components/StateUsers";
import Attendance from "client/components/attendance";
import NoticeBoard from "client/components/Notice/NoticeBoard";
import DatabaseGUI from "client/components/DatabaseGuI";
import MemberComponent from "client/components/MemberVerification/MemberComponent";
import PendingUsersComponent from "client/components/test";
import CheckUsersCount from "client/components/checktest";

const Dash: React.FC = () => {
  return (
    <div className={mainpagecontainer}>
      <Sidebar />
      <div className={contentcontainer}>
        <div className={`${section} ${fullRowSection}`}>
          <div>
            <h2 className={title}>Hello matomabo</h2>
            <p>권한 나타내기</p>
          </div>
        </div>
        <div className={`${section} ${projectSection}`}>
          <div className={cardContent}>
            <Project projects={[]} />
          </div>
        </div>
        <div className={`${section} ${requestSection}`}>
          <div className={cardHeader}>Requests</div>
          <CheckUsersCount />
        </div>
        <div className={`${section} ${userManagementSection}`}>
          <div className={cardHeader}>User Management</div>
          {/* <MemberComponent /> */}
          <PendingUsersComponent />
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
