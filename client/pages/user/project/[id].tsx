import { useEffect, useState } from "react";
import * as style from "client/styles/project/root.css";
import Side from "client/components/userMainPage/userLeftContent";
import Content from "client/components/userMainPage/mainHeader";
import Link from "next/link";
import CalendarComponent from "client/components/Calendar/calendar";
import { useRouter } from "next/router";
import MainHeader from "client/components/common/header/headerComponent";

// [ ] 테이블 만들기
const UserHome: React.FC = () => {
  const router = useRouter();
  const { id, query } = router.query;


  return (
    <div className={style.root}>
      <Side />
      <div className={style.contentContainer}>
        <MainHeader id={"야호"} project_name={id as string} />
        <div className={style.teamInfoContainer}>teamDescription</div>
      </div>
    </div>
  );
};

export default UserHome;
