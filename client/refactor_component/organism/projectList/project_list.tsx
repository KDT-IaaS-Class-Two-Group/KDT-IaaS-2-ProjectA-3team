import React from "react";
import ProjectInfoComponent from "../../molecule/project_info_component/project_info_component";
import { ProjectListProps } from "./props/project.props";
import { pagemaincontainer } from "client/styles/team/teampage.css";
import ProjectInfo from "client/refactor_component/molecule/project_info_component/project";
interface ProjectData {
  project_name: string;
  team_name: string;
  project_start_date: string;
  project_end_date: string;
}
interface ProjectGroupProps {
  projectGroup: ProjectData[];
  onClick: (item: ProjectData) => void;
}

const ProjectGroup: React.FC<ProjectGroupProps> = ({ projectGroup, onClick }) => (
  <div className={pagemaincontainer}>
    {Object.values(projectGroup)
      .flat()
      .map((item, subIndex) => (
        <div key={subIndex} className="itemContainer">
          <ProjectInfo project={item} onClick={() => onClick(item)} />
        </div>
      ))}
    
  </div>
);

export default ProjectGroup;