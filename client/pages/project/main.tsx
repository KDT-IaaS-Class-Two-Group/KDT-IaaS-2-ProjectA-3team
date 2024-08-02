import { useState } from 'react';

import * as style from 'client/styles/project/root.css';
import Main from 'client/components/main/mainComponent';
import Side from 'client/components/side/sideContainer';
import Modal from 'client/components/modal/modal';
const test: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className={style.root}>
      <Side></Side>
      <Main openModal={openModal}></Main>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>모달</h2>
        <p>ModalTest</p>
      </Modal>
    </div>
  );
};

export default test;
