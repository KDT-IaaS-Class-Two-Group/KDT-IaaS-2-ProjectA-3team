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
  projectHeader,
  projectTitle,
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
import Button from "../common/elements/button";
import ProjectView from "../project/info";
import PendingUserLook from "../auth_Component/userRequestConfirm/userlookup";
import UserRequest from "../auth_Component/userRequestConfirm/checkprofile";
import DBGUI from "../dbGUI/databaseGUI";
import { tdn } from "client/styles/templatebutton.css";
import { projectitletext } from "client/styles/admin/project/project.css";
interface AdminMainContentProps {
  onclick: (component: React.ReactNode) => void;
}

const AdminMainContent: React.FC<AdminMainContentProps> = ({ onclick }) => {
  return (
    <div className={maincontentcontainer}>
      <div className={`${section} ${projectSection}`}>
        <div className={cardHeader}>
          <div className={projectTitle}>
            <span className={projectitletext}>Project</span>
            <Button onClick={() => onclick(<ProjectView />)} />
          </div>
        </div>
        <div className={cardContent}></div>
        <Project />
      </div>

      <div className={`${section} ${requestSection}`}>
        <div className={cardHeader}>
          <div className={projectTitle}>
            <span className={projectitletext}>User Request Management</span>
            <Button onClick={() => onclick(<UserRequest />)} />
          </div>
        </div>
        <div className={cardContent}></div>
        <CheckUsersCount />
      </div>

      <div className={`${section} ${requestSection}`}>
        <div className={cardHeader}>
          <div className={projectTitle}>
            <span className={projectitletext}>User Sign up Management</span>
            <Button onClick={() => onclick(<PendingUserLook />)} />
          </div>
        </div>
        <div className={cardContent}></div>
        <PendingUsersList />
      </div>

      <div className={`${section} ${attendanceSection}`}>
        <div className={cardHeader}>
          <div className={projectTitle}>
            <span className={projectitletext}>Work Attendance</span>
            <Button onClick={() => onclick(<Attendance />)} />
          </div>
        </div>
        <div className={cardContent}>
          <Attendance />
        </div>
      </div>

      <div className={`${section} ${noticeBoardSection}`}>
        <div className={cardHeader}>
          <div className={projectTitle}>
            <span className={projectitletext}>Notice Board</span>
            <Link href="/noticeMain" className={tdn}>
              <Button>게시판</Button>
            </Link>
          </div>
        </div>
        <div className={cardContent}></div>
        <NoticeBoard />
      </div>

      <div className={`${section} ${databaseGUISection}`}>
        <div className={cardHeader}>
          <div className={projectTitle}>
            <span className={projectitletext}>Database GUI</span>
            <Button onClick={() => onclick(<DBGUI />)} />
          </div>
        </div>
        <div className={cardContent}></div>
        <DatabaseGUI />
      </div>
    </div>
  );
};

export default AdminMainContent;
