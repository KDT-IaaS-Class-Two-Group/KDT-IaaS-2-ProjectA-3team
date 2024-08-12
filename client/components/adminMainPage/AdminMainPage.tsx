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
import Button from "../common/elements/button";
import ProjectView from "../project/info";
import PendingUserLook from "../auth_Component/userRequestConfirm/userlookup";
import UserRequest from "../auth_Component/userRequestConfirm/checkprofile";
interface AdminMainContentProps {
  onclick: (component: React.ReactNode) => void;
}

const AdminMainContent: React.FC<AdminMainContentProps> = ({ onclick }) => {
  return (
    <div className={maincontentcontainer}>
      <div className={`${section} ${projectSection}`}>
        <div className={cardContent}>
          <Button onClick={() => onclick(<ProjectView />)} />
          <Project />
        </div>
      </div>

      <div className={`${section} ${requestSection}`}>
        <div className={cardHeader}>User Requests</div>
        <Button onClick={() => onclick(<UserRequest />)} />

        <CheckUsersCount />
      </div>

      <div className={`${section} ${requestSection}`}>
        <div className={cardHeader}>User Sign up Management</div>
        <Button onClick={() => onclick(<PendingUserLook />)} />
        <PendingUsersList />
      </div>

      <div className={`${section} ${attendanceSection}`}>
        <div className={cardHeader}>Work Attendance</div>
        <div className={cardContent}>
          <Button onClick={() => onclick(<Attendance />)} />
          <Attendance />
        </div>
      </div>

      <div className={`${section} ${noticeBoardSection}`}>
        <div className={cardHeader}>Notice Board</div>
        <div className={cardContent}>
          <Link href="/noticeMain" passHref>
            <Button>게시판</Button>
          </Link>
          <NoticeBoard />
        </div>
      </div>

      <div className={`${section} ${databaseGUISection}`}>
        <div className={cardHeader}>Database GUI</div>
        <div className={cardContent}>
          <Button onClick={() => onclick(<DatabaseGUI />)} />
          <DatabaseGUI />
        </div>
      </div>
    </div>
  );
};

export default AdminMainContent;
