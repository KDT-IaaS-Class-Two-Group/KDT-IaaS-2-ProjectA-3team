// organisms/props/ProjectListProps.ts
import  ProjectData  from "client/refactor_component/atom/date/props/date.props";

export default interface ProjectInfoProps {
  project: ProjectData;
  onMenuItemClick: (component: React.ReactNode) => void;
}
