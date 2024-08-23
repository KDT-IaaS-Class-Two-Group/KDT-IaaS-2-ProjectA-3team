import FormField from "client/refactor_component/molecule/form_field/form_field";
import Button from "client/refactor_component/atom/button/button";
import { bold32Text } from "client/styles/standardtextsize.css";
import { flexrowcontainer } from "client/styles/standardcontainer.css";
import { Dispatch, SetStateAction } from "react";

interface StepProps {
  projectName: string;
  setProjectName: Dispatch<SetStateAction<string>>;
  handleNext: () => void;
}

const ProjectSetName: React.FC<StepProps> = ({
  projectName,
  setProjectName,
  handleNext,
}) => {
  return (
    <div>
      <div className={bold32Text}>프로젝트 생성</div>
      <FormField
        id="projectName"
        label="Project Name"
        input_type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="프로젝트 이름"
      />
      <div className={flexrowcontainer}>
        <Button button_style="" button_text="다음" onClick={handleNext} />
      </div>
    </div>
  );
};

export default ProjectSetName;
