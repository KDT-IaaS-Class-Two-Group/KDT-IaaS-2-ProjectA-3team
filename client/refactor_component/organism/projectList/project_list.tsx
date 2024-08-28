import React from "react";
import ProjectInfoComponent from "../../molecule/project_info_component/project_info_component";
import { ProjectListProps } from "./props/project.props";

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onMenuItemClick,
}) => {
  return (
    <div>
      {projects.map((project) => (
        <ProjectInfoComponent
          key={project.project_id}
          project={project}
          onMenuItemClick={onMenuItemClick}
        />
      ))}
    </div>
  );
};

export default ProjectList;
