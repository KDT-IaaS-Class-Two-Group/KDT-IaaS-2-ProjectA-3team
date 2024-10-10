import React from "react";
import Header from "../../atom/header/header";
import SubHeader from "../../atom/SubHeader/subheader";
import Paragraph from "../../atom/Paragraph/Paragraph";
import { formatDate } from "client/refactor_component/atom/date/date";
import { HeaderContainer, itemContainer } from "client/styles/itemStyle.css";

interface ProjectData {
  project_name: string;
  team_name: string;
  project_start_date: string;
  project_end_date: string;
}

interface ProjectInfoProps {
  project: ProjectData;
  onClick: () => void;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, onClick }) => (
  <div className={itemContainer}>
    <Header onClick={onClick} className={HeaderContainer}>
      {project.project_name}
    </Header>
    <SubHeader>Team | {project.team_name}</SubHeader>
    <Paragraph>
      프로젝트 시작일 : {formatDate(project.project_start_date)}
    </Paragraph>
    <Paragraph>
      프로젝트 마감일 : {formatDate(project.project_end_date)}
    </Paragraph>
  </div>
);

export default ProjectInfo;
