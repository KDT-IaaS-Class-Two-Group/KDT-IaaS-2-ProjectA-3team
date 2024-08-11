import { MemberList } from "../style/memberList.css";
interface ProjectInfoProps {
  project_name : string;
}

const ProjectInfoItem : React.FC<ProjectInfoProps>= ({project_name})=>{
  return (
    <div className={''}>
      <h1>{project_name}</h1>
    </div>
  )
}
export default ProjectInfoItem;