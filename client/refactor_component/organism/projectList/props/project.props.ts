// src/organism/projectList/ProjectList.interface.ts
import ProjectData from "client/refactor_component/atom/date/props/date.props";

export interface ProjectListProps {
  projects: ProjectData[];
  onMenuItemClick: (component: React.ReactNode) => void;
}
