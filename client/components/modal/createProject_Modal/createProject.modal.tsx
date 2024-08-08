import useCreateProjectModal from "./hook/useCreateProject.modal";
import Modal from "../modal";
import Step1 from "./item/step1";
import Step2 from "./item/step2";
import Step3 from "./item/step3";

interface CreateProjectModalProps {
  onProjectCreated: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onProjectCreated }) => {
  const {
    isOpen,
    step,
    projectName,
    projectStartDate,
    projectEndDate,
    openModal,
    closeModal,
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
    <div>
      <button onClick={openModal}> 프로젝트 생성 </button>
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
          <Step3
            projectName={projectName}
            projectStartDate={projectStartDate}
            projectEndDate={projectEndDate}
            handleCreateProject={handleCreateProject}
          />
        )}
      </Modal>
    </div>
  );
};

export default CreateProjectModal;
