import { flexcolcontainer } from "client/styles/standardcontainer.css";
import { bold24Text, bold32Text } from "client/styles/standardtextsize.css";
import { SetStateAction, Dispatch } from "react";
import { projectgap, projectmodalbtn } from "../../style/modal.css";

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
      <div className={bold32Text}>프로젝트 기간 설정</div>
      <div className={flexcolcontainer}>
        <p className={bold24Text}> 프로젝트 시작 날짜</p>
        <label>
          <input
            type="date"
            value={
              projectStartDate
                ? projectStartDate.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setProjectStartDate(
                e.target.value ? new Date(e.target.value) : undefined
              )
            }
            placeholder="프로젝트 시작 날짜"
          />
        </label>
        <p className={bold24Text}> 프로젝트 마감 날짜</p>
        <label>
          <input
            type="date"
            value={
              projectEndDate ? projectEndDate.toISOString().split("T")[0] : ""
            }
            onChange={(e) =>
              setProjectEndDate(
                e.target.value ? new Date(e.target.value) : undefined
              )
            }
            placeholder="프로젝트 마감 날짜"
          />
        </label>
        <div className={projectgap}>
          <button
            className={projectmodalbtn}
            onClick={handleNext}
            disabled={!projectStartDate || !projectEndDate}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
