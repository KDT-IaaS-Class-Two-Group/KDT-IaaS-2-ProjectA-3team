import Button from "client/refactor_component/atom/button/button";
import { bold24Text, bold32Text } from "client/styles/standardtextsize.css";

interface ProjectSetCheckProps {
  projectName: string;
  projectStartDate: Date | undefined;
  projectEndDate: Date | undefined;
  team: any;
  handleCreateProject: () => Promise<void>;
}

const ProjectSetCheck: React.FC<ProjectSetCheckProps> = ({
  projectName,
  projectStartDate,
  projectEndDate,
  team,
  handleCreateProject,
}) => {
  return (
    <div>
      <div className={bold32Text}>프로젝트 생성 확인</div>
      <p className={bold24Text}>프로젝트 이름: {projectName}</p>
      <p className={bold24Text}>
        시작 날짜:{" "}
        {projectStartDate ? projectStartDate.toDateString() : "설정되지 않음"}
      </p>
      <p className={bold24Text}>
        마감 날짜:{" "}
        {projectEndDate ? projectEndDate.toDateString() : "설정되지 않음"}
      </p>
      <p className={bold24Text}>팀 : {team}</p>
      <button onClick={handleCreateProject}>프로젝트 생성</button>
      <Button
        button_text="생성"
        button_style=""
        onClick={handleCreateProject}
      ></Button>
    </div>
  );
};
export default ProjectSetCheck;
