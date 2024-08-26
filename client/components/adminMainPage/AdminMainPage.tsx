// import Link from "next/link";
// import {
//   mainpagecontainer,
//   contentcontainer,
//   section,
//   projectSection,
//   buttonSection,
//   title,
//   cardHeader,
//   cardContent,
//   proceedingButton,
//   allTasksButton,
//   maincontentcontainer,
//   projectHeader,
//   projectTitle,
// } from "client/styles/admin/admindashboard.css";
// import PendingUser from "client/components/MemberVerification/utils/PendingUser";
// import StateUsers from "client/components/StateUsers";
// import Attendance from "client/components/attendance";
// import NoticeBoard from "client/components/Notice/NoticeBoard";
// import DatabaseGUI from "client/components/DatabaseGuI";
// import { attendanceSection } from "client/styles/admin/workAttendance/workattendance.css";
// import { noticeBoardSection } from "client/styles/admin/noticeBoard/noticeboard.css";
// import { databaseGUISection } from "client/styles/admin/databaseGUI/databasegui.css";
// import { requestSection } from "client/styles/admin/requests/requests.css";
// import PendingUsersList from "client/components/PendingUsersList";
// import CheckUsersCount from "client/components/checktest";
// import { Button } from "../common/elements/button";
// import ProjectView from "../project/info";
// import PendingUserLook from "client/refactor_component/template/user_approval/pending_user_approval";
// import UserRequest from "client/refactor_component/template/user_profile_requests/profile_request_admin";
// import DBGUI from "../dbGUI/databaseGUI";
// import { tdn } from "client/styles/templatebutton.css";
// import { projectitletext } from "client/styles/admin/project/project.css";
// import NoticeMainPage from "../../pages/noticeMain";
// import Project from "client/refactor_component/template/project/project";
// interface AdminMainContentProps {
//   onclick: (component: React.ReactNode) => void;
// }

// const AdminMainContent: React.FC<AdminMainContentProps> = ({ onclick }) => {
//   return (
//     <div className={maincontentcontainer}>
//       <div className={`${section} ${projectSection}`}>
//         <div className={cardHeader}>
//           <div className={projectTitle}>
//             <span className={projectitletext}>Project</span>
//             <Button onClick={() => onclick(<ProjectView />)} />
//           </div>
//         </div>
//         <div className={cardContent}></div>
//         <Project />
//       </div>

//       <div className={`${section} ${requestSection}`}>
//         <div className={cardHeader}>
//           <div className={projectTitle}>
//             <span className={projectitletext}>User Request Management</span>
//             <Button onClick={() => onclick(<UserRequest />)} />
//           </div>
//         </div>
//         <div className={cardContent}></div>
//         <CheckUsersCount />
//       </div>

//       <div className={`${section} ${requestSection}`}>
//         <div className={cardHeader}>
//           <div className={projectTitle}>
//             <span className={projectitletext}>User Sign up Management</span>
//             <Button onClick={() => onclick(<PendingUserLook />)} />
//           </div>
//         </div>
//         <div className={cardContent}></div>
//         <PendingUsersList />
//       </div>

//       <div className={`${section} ${attendanceSection}`}>
//         <div className={cardHeader}>
//           <div className={projectTitle}>
//             <span className={projectitletext}>Work Attendance</span>
//             <Button onClick={() => onclick(<Attendance />)} />
//           </div>
//         </div>
//         <div className={cardContent}>
//           <Attendance />
//         </div>
//       </div>

//       <div className={`${section} ${noticeBoardSection}`}>
//         <div className={cardHeader}>
//           <div className={projectTitle}>
//             <span className={projectitletext}>Notice Board</span>
//             <div className={tdn}>
//               <Button onClick={() => onclick(<NoticeMainPage />)}>
//                 게시판
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className={cardContent}></div>
//         <NoticeBoard />
//       </div>

//       <div className={`${section} ${databaseGUISection}`}>
//         <div className={cardHeader}>
//           <div className={projectTitle}>
//             <span className={projectitletext}>Database GUI</span>
//             <Button onClick={() => onclick(<DBGUI />)} />
//           </div>
//         </div>
//         <div className={cardContent}></div>
//         <DatabaseGUI />
//       </div>
//     </div>
//   );
// };

// export default AdminMainContent;
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
import ProjectView from "../project/info";
import UserRequest from "client/refactor_component/template/user_profile_requests/profile_request_admin";
import DBGUI from "../dbGUI/databaseGUI";
import { tdn } from "client/styles/templatebutton.css";
import { projectitletext } from "client/styles/admin/project/project.css";
import NoticeMainPage from "../../pages/noticeMain";
import Project from "client/refactor_component/template/project/project";
import Card from "client/refactor_component/atom/card/card";
import CardHeader from "client/refactor_component/molecule/card_header/card_header";
import withCardSection from "client/refactor_component/organism/card/utils/with_card_section";
import PendingUserLook from "client/refactor_component/template/user_approval/pending_user_approval";
import { Admin } from "mongodb";
interface AdminMainContentProps {
  onClick: (component: React.ReactNode) => void;
}

// 섹션 구성을 위한 HOC
const ProjectSection = withCardSection(Project, {
  sectionClassName: `${section} ${projectSection}`,
  title: "Project",
  buttonText: "View Project",
  onClick: (props: AdminMainContentProps) => {
    props.onClick(<ProjectView />);
    return null; // ReactNode 반환으로 에러 해결
  },
});

const UserRequestSection = withCardSection(CheckUsersCount, {
  sectionClassName: `${section} ${requestSection}`,
  title: "User Request Management",
  buttonText: "View Requests",
  onClick: (props: AdminMainContentProps) => {
    props.onClick(<UserRequest />);
    return null;
  },
});

const PendingUserSection = withCardSection(PendingUsersList, {
  sectionClassName: `${section} ${requestSection}`,
  title: "User Sign up Management",
  buttonText: "View Pending Users",
  onClick: (props: AdminMainContentProps) => {
    props.onClick(<PendingUserLook />);
    return null;
  },
});

const AttendanceSection = withCardSection(Attendance, {
  sectionClassName: `${section} ${attendanceSection}`,
  title: "Work Attendance",
  buttonText: "View Attendance",
  onClick: (props: AdminMainContentProps) => {
    props.onClick(<Attendance />);
    return null;
  },
});

const NoticeBoardSection = withCardSection(NoticeBoard, {
  sectionClassName: `${section} ${noticeBoardSection}`,
  title: "Notice Board",
  buttonText: "View Notices",
  onClick: (props: AdminMainContentProps) => {
    props.onClick(<NoticeMainPage />);
    return null;
  },
});

const DatabaseGUISection = withCardSection(DatabaseGUI, {
  sectionClassName: `${section} ${databaseGUISection}`,
  title: "Database GUI",
  buttonText: "View Database",
  onClick: (props: AdminMainContentProps) => {
    props.onClick(<DBGUI />);
    return null;
  },
});

const AdminMainContent: React.FC<{
  onclick: (component: React.ReactNode) => void;
}> = ({ onclick }) => {
  return (
    <div className={maincontentcontainer}>
      <ProjectSection onClick={onclick} />
      <UserRequestSection onClick={onclick} />
      <PendingUserSection onClick={onclick} />
      <AttendanceSection onClick={onclick} />
      <NoticeBoardSection onClick={onclick} />
      <DatabaseGUISection onClick={onclick} />
    </div>
  );
};

export default AdminMainContent;
