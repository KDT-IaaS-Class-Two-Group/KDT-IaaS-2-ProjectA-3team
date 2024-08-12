import {
  cardContent,
  cardHeader,
  maincontentcontainer,
  projectSection,
  projectTitle,
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
import { Button } from "../common/elements/button";
import { useEffect, useState } from "react";
import React from "react";
import { plusButton, tdn } from "client/styles/templatebutton.css";
import { projectitletext } from "client/styles/admin/project/project.css";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import ClockInButton from "../backButtonSection/ClockInButton"; // 새로 만든 ClockInButton 컴포넌트 임포트

interface UserMainContentProps {
  onclick: (component: React.ReactNode) => void;
}

const UserMainContent: React.FC<UserMainContentProps> = ({ onclick }) => {
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
        <div className={cardContent}>임시 내용</div>
      </div>
      <div className={`${usersection} ${calendarsection}`}>
        <div className={projectTitle}>
          <span className={projectitletext}>Notice Board</span>

          <Link href="/noticeMain" className={tdn}>
            <Button>게시판</Button>
          </Link>
        </div>
        <NoticeBoard />
      </div>
      <div className={`${usersection} ${todolistsection}`}>
        <div className={cardHeader}>todolist</div>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${usernoticesection}`}>
        <div className={cardHeader}>
          <div className={projectTitle}>
            <CalendarComponent />
          </div>
        </div>
      </div>
      <div className={`${usersection} ${companybutton}`}>
        <div className={cardHeader}>출퇴근 버튼</div>
        <div className={cardContent}>
          {userId && <ClockInButton userId={userId} />}
        </div>
      </div>
    </>
  );
};

export default UserMainContent;
