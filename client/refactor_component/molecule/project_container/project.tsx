// molecules/ProjectInfoComponent.tsx
import React from "react";
import { itemContainer, HeaderContainer } from "client/refactor_component/atom/date/style/Data.css";
import { formatDate } from "client/refactor_component/atom/date/date";
import  ProjectInfoProps  from "./props/project.props";

const ProjectInfoComponent: React.FC<ProjectInfoProps> = ({
  project,
  onMenuItemClick,
}) => {
  return (
    <div className={itemContainer}>
      <h1
        className={HeaderContainer}
        onClick={() =>
          onMenuItemClick(
            <ProjectInfoComponent
              project={project}
              onMenuItemClick={onMenuItemClick}
            />
          )
        }
      >
        {project.project_name}
      </h1>
      <h2>Team | {project.team_name}</h2>
      <p>프로젝트 시작일: {formatDate(project.project_start_date)}</p>
      <p>프로젝트 마감일: {formatDate(project.project_end_date)}</p>
    </div>
  );
};

export default ProjectInfoComponent;
