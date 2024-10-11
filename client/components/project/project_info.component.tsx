import ProjectInfoComponent from "client/components/project_info/project_info";
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
