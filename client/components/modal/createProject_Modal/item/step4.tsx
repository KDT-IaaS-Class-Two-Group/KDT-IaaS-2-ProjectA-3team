interface StepProps {
  projectName: string;
  projectStartDate: Date | undefined;
  projectEndDate: Date | undefined;
  handleCreateProject: () => Promise<void>;
}

const Step3: React.FC<StepProps> = ({
  projectName,
  projectStartDate,
  projectEndDate,
  handleCreateProject
}) => {
  return (
    <div>
      <h2>프로젝트 생성 확인</h2>
      <p>프로젝트 이름: {projectName}</p>
      <p>시작 날짜: {projectStartDate ? projectStartDate.toDateString() : '설정되지 않음'}</p>
      <p>마감 날짜: {projectEndDate ? projectEndDate.toDateString() : '설정되지 않음'}</p>
      <button onClick={handleCreateProject}>프로젝트 생성</button>
    </div>
  );
};

export default Step3;
