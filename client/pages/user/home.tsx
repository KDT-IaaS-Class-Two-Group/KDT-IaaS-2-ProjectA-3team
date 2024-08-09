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
import {
  calendarsection,
  companybutton,
  favsection,
  kanbansection,
  todolistsection,
  usernoticesection,
} from "client/styles/users/userdashboard.css";
import { noticeBoardSection } from "client/styles/admin/noticeBoard/noticeboard.css";
import { MainHeader } from "client/components/common/header/mainheader";
const UserHome: React.FC = () => {
  return (
    <div className={mainpagecontainer}>
      <UserSidebar></UserSidebar>
      <div className={contentcontainer}>
        <MainHeader></MainHeader>
        <div className={`${section} ${favsection}`}>
          <div className={cardContent}></div>
        </div>
        <div className={`${section} ${favsection}`}>
          <div className={cardContent}></div>
        </div>
        <div className={`${section} ${favsection}`}>
          <div className={cardContent}></div>
        </div>
        <div className={`${section} ${kanbansection}`}>
          <div className={cardHeader}>kanban board</div>
          <div className={cardContent}>Requested by 3 users</div>
        </div>
        <div className={`${section} ${calendarsection}`}>
          <CalendarComponent></CalendarComponent>
        </div>
        <div className={`${section} ${todolistsection}`}>
          <div className={cardHeader}>todolist</div>
          <div className={cardContent}></div>
        </div>
        <div className={`${section} ${usernoticesection}`}>
          <div className={cardHeader}>noticeboard</div>
          <div className={cardContent}>asd</div>
        </div>
        <div className={`${section} ${companybutton}`}>
          <div className={cardHeader}>출퇴근 버튼</div>
          <div className={cardContent}>Authorize 5 users</div>
        </div>
      </div>
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
