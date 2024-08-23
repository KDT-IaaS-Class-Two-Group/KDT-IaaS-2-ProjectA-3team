import Modal from "../original/modal";
import ModalProps from "../props/modal.props";
import useProjectState from "./hook/use_project";
import ProjectSetDate from "./item/project_date_set/project_date_set";
import ProjectSetTeam from "./item/project_team_set/project_team_set";
import ProjectSetCheck from "./item/project_check_set/project_check_set";
import ProjectSetName from "./item/project_name_set/project_name_set";

const CreateProjectModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const {
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
  } = useProjectState();

  const handleCreateProject = async () => {
    await handleCreate();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {step === 1 && (
        <ProjectSetName
          projectName={projectName}
          setProjectName={setProjectName}
          handleNext={handleNext}
        />
      )}
      {step === 2 && (
        <ProjectSetDate
          projectStartDate={projectStartDate}
          projectEndDate={projectEndDate}
          setProjectStartDate={setProjectStartDate}
          setProjectEndDate={setProjectEndDate}
          handleNext={handleNext}
        />
      )}
      {step === 3 && (
        <ProjectSetTeam handleNext={handleNext} setTeam={setTeam} team={team} />
      )}
      {step === 4 && (
        <ProjectSetCheck
          projectName={projectName}
          projectStartDate={projectStartDate}
          projectEndDate={projectEndDate}
          team={team}
          handleCreateProject={handleCreateProject}
        />
      )}
    </Modal>
  );
};
export default CreateProjectModal;
