import useCreateProjectModal from "./hook/useCreateProject.modal";
import Modal from "../modal";
import Step1 from "./item/step1";
import Step2 from "./item/step2";
import Step3 from "./item/step3";
import Step4 from "./item/step4";
import * as styles from "../../../styles/sideproject/sideproject.css";
import {
  projectbuttoncontainer,
  teambuttoncontainer,
} from "client/styles/team/teampage.css";

interface CreateProjectModalProps {
  onProjectCreated: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  onProjectCreated,
}) => {
  const {
    isOpen,
    step,
    projectName,
    projectStartDate,
    projectEndDate,
    openModal,
    closeModal,
    team,
    setTeam,
    handleNext,
    handleCreate,
    setProjectName,
    setProjectStartDate,
    setProjectEndDate,
  } = useCreateProjectModal();

  const handleCreateProject = async () => {
    await handleCreate();
    onProjectCreated();
    closeModal();
  };

  return (
    <div className={projectbuttoncontainer}>
      <button onClick={openModal} className={styles.blueButton}>
        프로젝트 생성
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {step === 1 && (
          <Step1
            projectName={projectName}
            setProjectName={setProjectName}
            handleNext={handleNext}
          />
        )}
        {step === 2 && (
          <Step2
            projectStartDate={projectStartDate}
            projectEndDate={projectEndDate}
            setProjectStartDate={setProjectStartDate}
            setProjectEndDate={setProjectEndDate}
            handleNext={handleNext}
          />
        )}
        {step === 3 && (
          <Step3 handleNext={handleNext} setTeam={setTeam} team={team} />
        )}
        {step === 4 && (
          <Step4
            projectName={projectName}
            projectStartDate={projectStartDate}
            projectEndDate={projectEndDate}
            team={team}
            handleCreateProject={handleCreateProject}
          />
        )}
      </Modal>
    </div>
  );
};

export default CreateProjectModal;
