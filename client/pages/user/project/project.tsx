import { useState } from "react";

import * as style from "client/styles/project/root.css";

import Side from "client/components/userMainPage/userLeftContent";
import CreateProjectModal from "client/components/MODAL/createProject_Modal/createProject.modal";
import Link from "next/link";

const test: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={style.root}>
      <Side></Side>
      <div>
        <h1>프로젝트 View</h1>
        <div className={style.root}>
          <CreateProjectModal />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default test;
