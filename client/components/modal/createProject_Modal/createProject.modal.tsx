import useCreateProjectModal from "./hook/useCreateProject.modal";
import Modal from "../modal";
import Step1 from "./item/step1";
import Step2 from "./item/step2";
import Step3 from "./item/step3";

/**
 * * Function : createProject
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @function createProject
 * @description : 프로젝트 생성 모달 Component
 * step 상태 변수를 통해 Modal 내부 컨텐츠를 교환. (item 디렉토리 내부에 정의된 step 컴포넌트를 사용.)
 */

const CreateProjectModal = () => {
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
            handleCreateProject={handleCreate}
          />
        )}
      </Modal>
    </div>
  );
};

export default CreateProjectModal;
