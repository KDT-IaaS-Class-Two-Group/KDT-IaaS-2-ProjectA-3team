import { useState } from "react";

import * as style from "client/styles/project/root.css";

import Side from "client/components/userMainPage/userLeftContent";
import CreateProjectModal from "client/components/MODAL/createProject_Modal/createProject.modal";
import Link from "next/link";

const test: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [projectName, setProjectName] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step === 1 && projectName !== "") {
      setStep(2);
    } else if (step === 2 && projectDuration !== "") {
      setStep(3);
    }
  };

  const handleCreateProject = () => {
    console.log("야호");
    closeModal();
  };

  return (
    <div className={style.root}>
      <Side></Side>
      <div>
        <h1>프로젝트 View</h1>
        <CreateProjectModal/>
        <button>
          <Link href={"/user/team"}>Team</Link>
        </button>
      </div>
    </div>
  );
};

export default test;
