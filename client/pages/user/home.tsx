import { useState } from "react";
import * as style from "client/styles/project/root.css";
import Side from "client/components/userMainPage/userLeftContent";
import Content from "client/components/userMainPage/mainHeader";
import Link from "next/link";
import CalendarComponent from "client/components/Calendar/calendar";
import UserSidebar from "../../components/SideBar/UserSidebar";
import {
  cardContent,
  cardHeader,
  contentcontainer,
  mainpagecontainer,
  section,
} from "client/styles/admin/admindashboard.css";
import {
  admintext,
  fullRowSection,
  titlecontainer,
  titletext,
} from "client/styles/admin/greet/greet.css";
import { requestSection } from "client/styles/admin/requests/requests.css";
import { attendanceSection } from "client/styles/admin/workAttendance/workattendance.css";
import Attendance from "client/components/attendance";
import NoticeBoard from "client/components/Notice/NoticeBoard";
import { noticeBoardSection } from "client/styles/admin/noticeBoard/noticeboard.css";
import { databaseGUISection } from "client/styles/admin/databaseGUI/databasegui.css";
import { favSection } from "client/styles/users/userdashboard.css";
const UserHome: React.FC = () => {
  return (
    <div className={mainpagecontainer}>
      <UserSidebar></UserSidebar>
      <div className={contentcontainer}>
        <div className={`${section} ${fullRowSection}`}>
          <div className={titlecontainer}>
            <p className={titletext}>hello 아무이름</p>
            <p className={admintext}>권한</p>
          </div>
        </div>
        <div className={`${section} ${favSection}`}>
          <div className={cardContent}></div>
        </div>
        <div className={`${section} ${favSection}`}>
          <div className={cardContent}></div>
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
          <div className={cardContent}></div>
        </div>
      </div>
      {/* <CalendarComponent></CalendarComponent> */}
      {/* <div>
        <button>
          <Link href={"/user/project/info"}>project</Link>
        </button>
        <button>
          <Link href={"/user/team"}>Team</Link>
        </button>
      </div> */}
    </div>
  );
};

export default UserHome;
