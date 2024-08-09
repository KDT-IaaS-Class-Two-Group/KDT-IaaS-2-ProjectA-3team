import { useState } from "react";
import * as style from "client/styles/project/root.css";
import Side from "client/components/userMainPage/userLeftContent";
import Content from "client/components/userMainPage/mainHeader";
import Link from "next/link";
import CalendarComponent from "client/components/Calendar/calendar";
import UserSidebar from "../../components/SideBar/UserSidebar";
import { mainpagecontainer } from "client/styles/admin/dashboardStyles.css";
const UserHome: React.FC = () => {
  return (
    <div className={mainpagecontainer}>
      <UserSidebar></UserSidebar>

      <CalendarComponent></CalendarComponent>
      <div>
        <button>
          <Link href={"/user/project/info"}>project</Link>
        </button>
        <button>
          <Link href={"/user/team"}>Team</Link>
        </button>
      </div>
    </div>
  );
};

export default UserHome;
