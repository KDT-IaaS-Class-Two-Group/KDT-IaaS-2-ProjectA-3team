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
import {
  calendartitle,
  choltwediv,
  choltwedivcontainer,
  plusButton,
  tdn,
} from "client/styles/templatebutton.css";
import { projectitletext } from "client/styles/admin/project/project.css";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import ClockInButton from "../backButtonSection/ClockInButton"; // 새로 만든 ClockInButton 컴포넌트 임포트
import NoticeMainPage from "client/pages/noticeMain";

interface UserMainContentProps {
  onclick: (component: React.ReactNode) => void;
}

interface User {
  user_id: string;
  username: string;
  email: string;
}

const UserMainContent: React.FC<UserMainContentProps> = ({ onclick }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

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

  // 팔로우한 사용자 목록을 가져오는 함수
  const fetchFollowingList = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/getUser/followingList`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 세션 기반 인증을 위한 쿠키 포함
        }
      );

      if (response.ok) {
        const data: User[] = await response.json();
        setFollowingUsers(data);
      } else {
        console.error("Failed to fetch following list");
      }
    } catch (error) {
      console.error("Error occurred while fetching following list", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadSessionData = async () => {
      const sessionData = await fetchSessionData();
      if (sessionData) {
        setUserId(sessionData.user_id);
        fetchFollowingList(); // 사용자 ID로 팔로우한 사용자 목록 가져오기
      }
    };

    loadSessionData();
  }, []);

  return (
    <>
      <div className={`${usersection} ${favsection}`}>
        <div className={cardContent}>
          {followingUsers[0]?.username || "No followed users"}
        </div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={cardContent}>
          {followingUsers[1]?.username || "No followed users"}
        </div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={cardContent}>
          {followingUsers[2]?.username || "No followed users"}
        </div>
      </div>
      <div className={`${usersection} ${kanbansection}`}>
        <div className={cardHeader}>kanban board</div>
        <div className={cardContent}>임시 내용</div>
      </div>
      <div className={`${usersection} ${calendarsection}`}>
        <div className={projectTitle}>
          <span>Notice Board</span>
          <div className={tdn}>
            <Button onClick={() => onclick(<NoticeMainPage />)}>게시판</Button>
          </div>
        </div>
        <NoticeBoard />
      </div>
      <div className={`${usersection} ${todolistsection}`}>
        <div className={cardHeader}>todolist</div>
        <div className={cardContent}></div>
      </div>
      <div className={`${usersection} ${usernoticesection}`}>
        <div className={cardHeader}>
          <CalendarComponent />
        </div>
      </div>
      <div className={`${usersection} ${companybutton}`}>
        <div className={cardHeader}>출퇴근 버튼</div>
        <div className={choltwedivcontainer}>
          {userId && <ClockInButton userId={userId} />}
        </div>
      </div>
    </>
  );
};

export default UserMainContent;
