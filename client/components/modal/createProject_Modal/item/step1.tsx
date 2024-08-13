import {
  base24Text,
  base32Text,
  bold24Text,
  bold32Text,
} from "client/styles/standardtextsize.css";
import { SetStateAction, Dispatch } from "react";
import { projectmodalbtn } from "../../style/modal.css";
import { flexrowcontainer } from "client/styles/standardcontainer.css";

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
      <div className={bold32Text}>프로젝트 생성</div>
      <p className={bold24Text}>Project Name</p>
      <div className={flexrowcontainer}>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="프로젝트 이름"
        />
        <button
          className={projectmodalbtn}
          onClick={handleNext}
          disabled={!projectName}
        >
          다음
        </button>
      </div>
    </div>
  );
};
export default Step1;
