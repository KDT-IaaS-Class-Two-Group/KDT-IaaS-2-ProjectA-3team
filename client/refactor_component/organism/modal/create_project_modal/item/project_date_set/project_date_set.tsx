import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import Button from "client/refactor_component/atom/button/button";
import FormField from "client/refactor_component/molecule/form_field/form_field";
import { flexcolcontainer } from "client/styles/standardcontainer.css";
import { bold24Text, bold32Text } from "client/styles/standardtextsize.css";

interface StepProps {
  projectStartDate: Date | undefined;
  projectEndDate: Date | undefined;
  setProjectStartDate: Dispatch<SetStateAction<Date | undefined>>;
  setProjectEndDate: Dispatch<SetStateAction<Date | undefined>>;
  handleNext: () => void;
}

const ProjectSetDate: React.FC<StepProps> = ({
  projectStartDate,
  projectEndDate,
  setProjectStartDate,
  setProjectEndDate,
  handleNext,
}) => {
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProjectStartDate(value ? new Date(value) : undefined);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProjectEndDate(value ? new Date(value) : undefined);
  };

  return (
    <div>
      <div className={bold32Text}> 프로젝트 기간 설정 </div>
      <div className={flexcolcontainer}>
        <FormField
          id="projectStartDate"
          label="프로젝트 시작 날짜"
          input_type="date"
          placeholder=""
          value={
            projectStartDate ? projectStartDate.toISOString().split("T")[0] : ""
          }
          onChange={handleStartDateChange}
        />
        <FormField
          id="projectEndDate"
          label="프로젝트 마감 날짜"
          input_type="date"
          placeholder=""
          value={
            projectEndDate ? projectEndDate.toISOString().split("T")[0] : ""
          }
          onChange={handleEndDateChange}
        />
        <div className="">
          <Button
            button_text="다음"
            button_style=""
            onClick={handleNext}
            disabled={!projectStartDate || !projectEndDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectSetDate;
