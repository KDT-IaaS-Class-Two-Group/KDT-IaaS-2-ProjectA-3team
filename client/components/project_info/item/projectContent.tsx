import { StackResult } from "../interface/stackResult.interface";
import { MemberList } from "../style/memberList.css";
interface ProjectInfoProps {
  project_name: string;
  projectStack: StackResult[];
}
interface Stack {
  stack_name: string;
  stack_type: string;
}

const ProjectInfoItem: React.FC<ProjectInfoProps> = ({
  project_name,
  projectStack,
}) => {
  return (
    <div className={""}>
      <h1>{project_name}</h1>
      {projectStack.map((stack: Stack, index) => {
        return <p>{stack.stack_name}</p>;
      })}
    </div>
  );
};
export default ProjectInfoItem;
