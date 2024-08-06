import {
  modalBackdrop,
  modalContent,
  closeButton,
} from 'client/styles/modal/modal.css';
import React, { useState, useEffect } from 'react';

interface ListNotice {
  title: string;
  createdAt: string;
  content: string; // 내용 필드 추가
}

interface ModalProps {
  isOpen: boolean;
  notice: ListNotice | null;
  onClose: () => void;
}

const NoticeModal: React.FC<ModalProps> = ({ isOpen, notice, onClose }) => {
  if (!isOpen || !notice) return null;

  return (
    <div className={modalBackdrop}>
      <div className={modalContent}>
        <button className={closeButton} onClick={onClose}>X</button>
        <h2>{notice.title}</h2>
        <p>{notice.content}</p>
        <p>{notice.createdAt}</p>
        <button onClick={SuJung}>수정</button>
        <button onClick={Delete}>삭제</button>
      </div>
    </div>
  );
};

const NoticeMainContent = () => {
  const [userList, setUserList] = useState<ListNotice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<ListNotice | null>(null); // 선택된 게시물 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 관리

  useEffect(() => {
    const fetchNotices = () => {
      fetch('http://localhost:3001/notices')
        .then((response) => {
          return response.json();
        })
        .then((data: ListNotice[]) => {
          setUserList(data);
        })
        .catch((err) => {
          console.error('데이터를 가져오는 중 오류 발생:', err);
        });
    };
    fetchNotices();
  }, []);

  const SuJung = () => {
    
  }

  const Delete = () => {

  }

  const handleTitleClick = (notice: ListNotice) => {
    setSelectedNotice(notice); // 선택된 게시물 설정
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedNotice(null); // 선택된 게시물 초기화
  };

  return (
    <div>
      {userList.length > 0 ? (
        userList.map((notice, index) => (
          <div key={index}>
            <h3 onClick={() => handleTitleClick(notice)}>{notice.title}</h3>
            <p>{notice.createdAt}</p>
          </div>
        ))
      ) : (
        <div>게시물 없음</div>
      )}

      <NoticeModal 
        isOpen={isModalOpen} 
        notice={selectedNotice} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default NoticeMainContent;
