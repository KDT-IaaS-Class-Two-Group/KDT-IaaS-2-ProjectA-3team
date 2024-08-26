// molecule/ProjectInfoComponent.tsx

import React from "react";
import ProjectData from "../../atom/Date/props/date.props";
import { HeaderContainer, itemContainer } from "../../atom/Date/style/Data.css";
import { formatDate } from "../../atom/Date/date";

interface ProjectInfoProps {
  project: ProjectData;
  onMenuItemClick: (component: React.ReactNode) => void;
}

const ProjectInfoComponent: React.FC<ProjectInfoProps> = ({
  project,
  onMenuItemClick,
}) => {
  return (
    <div className={itemContainer}>
      <h1
        className={HeaderContainer}
        onClick={() => {
          onMenuItemClick(
            <ProjectInfoComponent
              project={project}
              onMenuItemClick={onMenuItemClick}
            />
          );
        }}
      >
        {project.project_name}
      </h1>
      <h2>Team | {project.team_name}</h2>
      <p>프로젝트 시작일 : {formatDate(project.project_start_date)}</p>
      <p>프로젝트 마감일 : {formatDate(project.project_end_date)}</p>
    </div>
  );
};

export default ProjectInfoComponent;
