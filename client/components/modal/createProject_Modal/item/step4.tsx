import { bold24Text, bold32Text } from "client/styles/standardtextsize.css";
import { projectbackground } from "../../style/modal.css";
import { fetchProjectData } from "../service/fetchProjectData"; // fetchProjectData import 추가

interface StepProps {
  projectName: string;
  projectStartDate: Date | undefined;
  projectEndDate: Date | undefined;
  team: string;
  handleCreateProject: () => Promise<void>;
}

const Step3: React.FC<StepProps> = ({
  projectName,
  projectStartDate,
  projectEndDate,
  team,
  handleCreateProject,
}) => {
  
  // handleCreateProject 함수는 컴포넌트 내부에서 정의되어야 합니다.
  const handleCreateProjectLocal = async () => {
    const projectData = {
      project_name: projectName,
      project_start_date: projectStartDate ? new Date(projectStartDate) : new Date(), // Date로 변환
      project_end_date: projectEndDate ? new Date(projectEndDate) : new Date(),     // Date로 변환
      team_name: team,
    };
  
    console.log("Sending project data:", projectData);
  
    // 프로젝트 데이터를 fetch로 전송
    try {
      await fetchProjectData(projectData);
    } catch (error) {
      console.error("프로젝트 생성 중 오류 발생:", error);
    }
  };
  

  return (
    <div className={projectbackground}>
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
      <button onClick={handleCreateProjectLocal}>프로젝트 생성</button>
    </div>
  );
};

export default Step3;
