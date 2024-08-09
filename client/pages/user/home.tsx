import { useState } from "react";
import * as style from "client/styles/project/root.css";
import Side from "client/components/userMainPage/userLeftContent";
import Content from "client/components/userMainPage/mainHeader";
import Link from "next/link";
import CalendarComponent from "client/components/Calendar/calendar";

const UserHome: React.FC = () => {
  return (
    <div className={style.root}>
      <Side />
      <Content>
        <p>야호</p>
        <CalendarComponent></CalendarComponent>
      </Content>
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
