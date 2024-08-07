import { SetStateAction, Dispatch } from "react";

interface StepProps {
  projectName: string;
  setProjectName: Dispatch<SetStateAction<string>>;
  handleNext: () => void;
}

const Step1: React.FC<StepProps> = ({
  projectName,
  setProjectName,
  handleNext,
}) => {
  return (
    <div>
      <h2>프로젝트 생성</h2>
      <p>Project Name</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="프로젝트 이름"
      />
      <button onClick={handleNext} disabled={!projectName}>
        다음
      </button>
    </div>
  );
};
export default Step1;