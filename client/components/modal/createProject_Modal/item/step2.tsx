import { SetStateAction, Dispatch } from "react";

interface StepProps {
  projectStartDate: Date | undefined;
  projectEndDate: Date | undefined;
  setProjectStartDate: Dispatch<SetStateAction<Date | undefined>>;
  setProjectEndDate: Dispatch<SetStateAction<Date | undefined>>;
  handleNext: () => void;
}

const Step2: React.FC<StepProps> = ({
  projectStartDate,
  projectEndDate,
  setProjectStartDate,
  setProjectEndDate,
  handleNext,
}) => {
  return (
    <div>
      <h2>프로젝트 기간 설정</h2>
      
      <label>
        프로젝트 시작 날짜
        <input
          type="date"
          value={projectStartDate ? projectStartDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setProjectStartDate(e.target.value ? new Date(e.target.value) : undefined)}
          placeholder="프로젝트 시작 날짜"
        />
      </label>
      
      <label>
        프로젝트 마감 날짜
        <input
          type="date"
          value={projectEndDate ? projectEndDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setProjectEndDate(e.target.value ? new Date(e.target.value) : undefined)}
          placeholder="프로젝트 마감 날짜"
        />
      </label>

      <button onClick={handleNext} disabled={!projectStartDate || !projectEndDate}>
        다음
      </button>
    </div>
  );
};

export default Step2;
