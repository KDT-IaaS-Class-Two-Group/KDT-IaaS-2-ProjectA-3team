import { useEffect, useState } from "react";
import * as style from "client/styles/project/root.css";
import Side from "client/components/userMainPage/basicDesign/userLeftContent";
import Content from "client/components/userMainPage/basicDesign/mainHeader";
import Link from "next/link";
import CalendarComponent from "client/components/Calendar/calendar";
import { useRouter } from "next/router";
import MainHeader from "client/components/common/header/mainheader";
import ProjectInfoComponent from "client/components/project_info/project_info";
import BackButton from "client/components/backButtonSection/backbutton";
import { USERS_URL } from "client/ts/enum/url/USER_URL.enum";
import { BUTTON_NAME } from "client/ts/enum/button_name/BUTTON_NAME.enum";
import { ADMIN_URL } from "client/ts/enum/url/ADMIN_URL.enum";

// [ ] 테이블 만들기
const UserHome: React.FC = () => {
  const router = useRouter();
  const { id, query } = router.query;

  let projectName: string = "";
  if (id !== undefined && !Array.isArray(id)) {
    projectName = id;
  }

  // [ ] MainHeader 아랫쪽 div component 생성
  return (
    <div className={style.root}>
      <Side />
      <div className={style.contentContainer}>
        <MainHeader />
        <div className={style.teamInfoContainer}>
          <div className={style.ContentHeader}>
            <BackButton
              url={ADMIN_URL.__INFO}
              button_name={BUTTON_NAME.PROJECT_INFO_BACK}
            />
          </div>

          <ProjectInfoComponent project_name={projectName} />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
