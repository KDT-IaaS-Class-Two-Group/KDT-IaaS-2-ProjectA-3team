import { StackResult } from "../interface/stackResult.interface";
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
      {projectStack.map((stack: Stack) => {
        // eslint-disable-next-line react/jsx-key
        return <p>{stack.stack_name}</p>;
      })}
    </div>
  );
};
export default ProjectInfoItem;
