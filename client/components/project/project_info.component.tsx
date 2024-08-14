import { useEffect, useState } from "react";
import * as style from "client/styles/project/root.css";
import Side from "client/components/userMainPage/userLeftContent";
import Content from "client/components/userMainPage/mainHeader";
import Link from "next/link";
import CalendarComponent from "client/components/Calendar/calendar";
import { useRouter } from "next/router";
import MainHeader from "client/components/common/header/mainheader";
import ProjectInfoComponent from "client/components/project_info/project_info";
import BackButton from "client/components/backButtonSection/backbutton";
import { USERS_URL } from "client/ts/enum/url/USER_URL.enum";
import { BUTTON_NAME } from "client/ts/enum/button_name/BUTTON_NAME.enum";
import { pagemainmain } from "client/styles/team/teampage.css";

interface IProjectTestComponent {
  project_name: string;
}
// [ ] 테이블 만들기
const ProjectTestComponent: React.FC<IProjectTestComponent> = ({
  project_name,
}) => {
  // [ ] MainHeader 아랫쪽 div component 생성
  return (
    <div className={pagemainmain}>
      <ProjectInfoComponent project_name={project_name} />
    </div>
  );
};

export default ProjectTestComponent;
