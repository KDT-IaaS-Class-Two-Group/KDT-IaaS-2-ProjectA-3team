import {
  cardContent,
  cardHeader,
  maincontentcontainer,
  projectSection,
  section,
} from "client/styles/admin/admindashboard.css";
import Link from "next/link";

import {
  calendarsection,
  companybutton,
  favsection,
  kanbansection,
  todolistsection,
  usernoticesection,
  usersection,
} from "client/styles/users/userdashboard.css";
import CalendarComponent from "../Calendar/calendar";
import NoticeBoard from "../Notice/NoticeBoard";
import Button from "../common/elements/button";
import { useEffect, useState } from "react";
import React from "react";
import ClockInOutModal from "../ClockInOutModal";
import { plusButton, tdn } from "client/styles/templatebutton.css";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
interface UserMainContentProps {
  onclick: (component: React.ReactNode) => void;
}

const UserMainContent: React.FC<UserMainContentProps> = ({ onclick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // 서버에서 세션 데이터를 가져오는 함수
  const fetchSessionData = async () => {
    try {
      const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 세션 쿠키를 포함하여 요청
      });

      if (response.ok) {
        const data = await response.json();
        return data.session;
      } else {
        console.error("Failed to fetch session data", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching session data", error);
      return null;
    }
  };

  useEffect(() => {
    const loadSessionData = async () => {
      const sessionData = await fetchSessionData();
      if (sessionData) {
        setUserId(sessionData.user_id);
      }
    };

    loadSessionData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`${usersection} ${favsection}`}>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${kanbansection}`}>
        <div className={cardHeader}>kanban board</div>
        <div className={cardContent}>Requested by 3 users</div>
      </div>
      <div className={`${usersection} ${calendarsection}`}>
        <CalendarComponent />
      </div>
      <div className={`${usersection} ${todolistsection}`}>
        <div className={cardHeader}>todolist</div>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${usernoticesection}`}>
        <div className={cardHeader}>noticeboard</div>
        <Link href="/noticeMain" className={tdn}>
          <Button>게시판</Button>
        </Link>
        <NoticeBoard />
      </div>
      <div className={`${usersection} ${companybutton}`}>
        <div className={cardHeader}>출퇴근 버튼</div>
        <div className={cardContent}>
          {userId && (
            <>
              <button onClick={handleOpenModal}>출퇴근</button>
              <ClockInOutModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                userId={userId} // 세션에서 가져온 user_id를 전달
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMainContent;
