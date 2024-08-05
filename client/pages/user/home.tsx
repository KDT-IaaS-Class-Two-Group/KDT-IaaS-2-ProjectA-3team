import { useState } from 'react';

import * as style from 'client/styles/project/root.css';
import Main from 'client/components/main/mainComponent';
import Side from 'client/components/userMainPage/userLeftContent';
// import Modal from 'client/components/modal/modal';
import Content from 'client/components/userMainPage/mainHeader';
import Link from 'next/link';

const test: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className={style.root}>
      <Side></Side>
      <Content />
      <button>
        <Link href={'/user/project/project'}>project</Link>
      </button>
      <button>
        <Link href={'/user/team'}>Team</Link>
      </button>
    </div>
  );
};

export default test;
