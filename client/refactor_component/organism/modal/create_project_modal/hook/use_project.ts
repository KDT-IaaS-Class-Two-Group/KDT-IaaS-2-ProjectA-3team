import { useState } from 'react';
import Project from "client/ts/Interface/project.interface"
import { fetchProjectData } from '../service/fetch_post_project';

const useProjectState = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [projectStartDate, setProjectStartDate] = useState<Date | undefined>(undefined);
  const [projectEndDate, setProjectEndDate] = useState<Date | undefined>(undefined);
  const [team, setTeam] = useState<string>('');
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handlePrevious = () => setStep((prevStep) => prevStep - 1);
  
  const handleCreate = async () => {
    const projectData: Project = {
      project_name: projectName,
      project_start_date: projectStartDate as Date,
      project_end_date: projectEndDate as Date,
      team_name : team
    };
    await fetchProjectData(projectData);
  };

  return {
    projectName,
    setProjectName,
    projectStartDate,
    setProjectStartDate,
    projectEndDate,
    setProjectEndDate,
    team,
    setTeam,
    step,
    setStep,
    handleNext,
    handlePrevious,
    handleCreate,
  };
};

export default useProjectState;
