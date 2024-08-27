//필요한 스타일 시트와 컴포넌트를 임포트합니다.
import {
  cardContent, // 카드 형태의 콘텐츠에 대한 스타일
  cardHeader, // 카드의 헤더 스타일
  maincontentcontainer, // 메인 콘텐츠 컨테이너 스타일
  projectSection, // 프로젝트 섹션의 스타일
  projectTitle, // 프로젝트 타이틀의 스타일
  section, // 일반 섹션의 스타일
} from "client/styles/admin/admindashboard.css";
import Link from "next/link"; // Next.js의 내장 링크 컴포넌트. 페이지 간 네비게이션에 사용됩니다.

import {
  calendarsection, // 캘린더 섹션 스타일
  companybutton, // 회사 버튼 스타일
  favsection, // 즐겨찾기 섹션 스타일
  kanbansection, // 칸반 섹션 스타일
  todolistsection, // 할일 목록 섹션 스타일
  usernoticesection, // 사용자 알림 섹션 스타일
  usersection, // 사용자 섹션의 기본 스타일
} from "client/styles/users/userdashboard.css";
import CalendarComponent from "client/refactor_component/molecule/calendar/calendar"; // 캘린더 기능을 제공하는 컴포넌트를 임포트합니다.

import { useEffect, useState } from "react"; // React의 내장 훅, 상태 관리 및 사이드 이펙트 처리를 위해 사용합니다.
import React from "react"; // React 라이브러리를 임포트합니다.
import {
  calendartitle, // 캘린더 제목 스타일
  choltwediv, // 출퇴근 버튼을 포함하는 div 스타일
  choltwedivcontainer, // 출퇴근 버튼을 감싸는 컨테이너 div 스타일
  plusButton, // 추가 버튼 스타일
  tdn, // 텍스트 데코레이션 없음 스타일
} from "client/styles/templatebutton.css";
import { projectitletext } from "client/styles/admin/project/project.css"; // 프로젝트 제목 텍스트 스타일
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM"; // API 요청 URL을 관리하는 ENUM 상수 파일을 임포트합니다.

import NoticeMainPage from "client/pages/noticeMain"; // 공지사항 메인 페이지를 임포트합니다.
import { followerlist } from "client/styles/notice/notice.css"; // 팔로워 목록 스타일
import KanbanComponent from "client/refactor_component/template/kanban_board/kanban"; // 칸반 보드 컴포넌트를 임포트합니다.
import NoticeBoard from "client/components/Notice/NoticeBoard";
import ClockInButtonSection from "client/refactor_component/organism/main_content/utils/sections/user/clock_in_button_section/clock_in_button_section";
import UserRequestSection from "client/refactor_component/organism/main_content/utils/sections/admin/user_request_section/user_request_section";
import KanbanBoardSection from "client/refactor_component/organism/main_content/utils/sections/user/kanban_board_section/kanban_board_section";
import NoticeBoardSection from "client/refactor_component/organism/main_content/utils/sections/admin/admin_notice_board_section/admin_notice_board_section";
import UserNoticeBoardSection from "client/refactor_component/organism/main_content/utils/sections/user/user_notice_board_section/user_notice_board_section";
import TodoListSection from "client/refactor_component/organism/main_content/utils/sections/user/todo_list/todo_list";
import CalendarSection from "client/refactor_component/organism/main_content/utils/sections/user/calendar_section/calendar_section";

interface UserMainContentProps {
  // 컴포넌트가 렌더링될 때 호출될 함수, 클릭 시 다른 컴포넌트를 표시하는 역할을 합니다.
  onclick: (component: React.ReactNode) => void;
}

interface User {
  // 사용자 정보를 나타내는 인터페이스로, 각 사용자는 ID, 사용자명, 이메일을 가집니다.
  user_id: string;
  username: string;
  email: string;
}

// UserMainContent 컴포넌트는 대시보드의 메인 콘텐츠를 렌더링합니다.
const UserMainContent: React.FC<UserMainContentProps> = ({ onclick }) => {
  // 사용자 ID 상태를 저장합니다. 초기값은 null로 설정합니다.
  const [userId, setUserId] = useState<string | null>(null);

  // 팔로잉한 사용자 목록을 저장하는 상태입니다. 초기값은 빈 배열입니다.
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);

  // 데이터 로딩 중임을 나타내는 상태입니다. 초기값은 false입니다.
  const [loading, setLoading] = useState(false);

  // 서버에서 세션 데이터를 가져오는 비동기 함수입니다.
  const fetchSessionData = async () => {
    try {
      // GET 요청을 통해 세션 데이터를 가져옵니다.
      const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // JSON 형식의 데이터를 주고받기 위한 헤더 설정
        },
        credentials: "include", // 세션 쿠키를 포함하여 요청합니다.
      });

      // 응답이 성공적이면 세션 데이터를 JSON 형식으로 파싱합니다.
      if (response.ok) {
        const data = await response.json();
        return data.session; // 세션 정보를 반환합니다.
      } else {
        // 응답이 실패한 경우 콘솔에 에러 메시지를 출력합니다.
        console.error("Failed to fetch session data", response.statusText);
        return null; // 에러 발생 시 null을 반환합니다.
      }
    } catch (error) {
      // 요청 도중 에러가 발생하면 콘솔에 에러를 출력합니다.
      console.error("Error fetching session data", error);
      return null; // 에러 발생 시 null을 반환합니다.
    }
  };

  // 팔로우한 사용자 목록을 서버에서 가져오는 비동기 함수입니다.
  const fetchFollowingList = async () => {
    // 데이터를 가져오는 동안 로딩 상태를 true로 설정합니다.
    setLoading(true);
    try {
      // GET 요청을 통해 팔로우한 사용자 목록을 가져옵니다.
      const response = await fetch(
        `http://localhost:3001/getUser/followingList`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // JSON 형식의 데이터를 주고받기 위한 헤더 설정
          },
          credentials: "include", // 세션 기반 인증을 위한 쿠키를 포함하여 요청합니다.
        }
      );

      // 응답이 성공적이면 팔로우한 사용자 데이터를 JSON 형식으로 파싱합니다.
      if (response.ok) {
        const data: User[] = await response.json();
        setFollowingUsers(data); // 가져온 데이터를 상태로 설정합니다.
      } else {
        // 응답이 실패한 경우 콘솔에 에러 메시지를 출력합니다.
        console.error("Failed to fetch following list");
      }
    } catch (error) {
      // 요청 도중 에러가 발생하면 콘솔에 에러를 출력합니다.
      console.error("Error occurred while fetching following list", error);
    } finally {
      // 데이터를 모두 가져온 후 로딩 상태를 false로 설정합니다.
      setLoading(false);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 실행되는 함수입니다.
  useEffect(() => {
    // 비동기로 세션 데이터를 로드합니다.
    const loadSessionData = async () => {
      const sessionData = await fetchSessionData(); // 세션 데이터를 가져옵니다.
      if (sessionData) {
        setUserId(sessionData.user_id); // 사용자 ID를 상태로 설정합니다.
        fetchFollowingList(); // 사용자 ID를 사용하여 팔로우한 사용자 목록을 가져옵니다.
      }
    };

    loadSessionData(); // 세션 데이터를 로드합니다.
  }, []); // 빈 배열을 두 번째 인자로 주어, 컴포넌트가 마운트될 때만 이 함수가 실행되도록 합니다.

  return (
    <>
      {/* 팔로우한 사용자 목록을 보여주는 섹션입니다. */}
      <div className={`${usersection} ${favsection}`}>
        <div className={followerlist}>
          {/* 팔로우한 사용자가 없으면 "No followed users"를 표시합니다. */}
          {followingUsers[0]?.username || "No followed users"}
        </div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={followerlist}>
          {followingUsers[1]?.username || "No followed users"}{" "}
          {/* 두 번째 사용자 */}
        </div>
      </div>
      <div className={`${usersection} ${favsection}`}>
        <div className={followerlist}>
          {followingUsers[2]?.username || "No followed users"}{" "}
          {/* 세 번째 사용자 */}
        </div>
      </div>
      <KanbanBoardSection onClick={onclick} />
      <UserNoticeBoardSection onClick={onclick} />
      <TodoListSection onClick={onclick} />
      <CalendarSection />
      <ClockInButtonSection userId={userId} />
    </>
  );
};

// UserMainContent 컴포넌트를 기본 내보내기로 설정합니다.
export default UserMainContent;
// import MainContentProps from "client/refactor_component/organism/main_content/props/main_content.props";
// import NoticeBoardSection from "client/refactor_component/organism/main_content/utils/sections/common/notice_board_section/notice_board_section";
// import ClockInButtonSection from "client/refactor_component/organism/main_content/utils/sections/user/clock_in_button_section/clock_in_button_section";
// import FollowingUserListSection from "client/refactor_component/organism/main_content/utils/sections/user/following_user_list_section/following_user_list_section";
// import KanbanBoardSection from "client/refactor_component/organism/main_content/utils/sections/user/kanban_board_section/kanban_board_section";
// import { maincontentcontainer } from "client/styles/admin/admindashboard.css";

// const UserMainContent: React.FC<MainContentProps> = ({
//   onClick,
//   userId,
//   followingUsers,
// }) => {
//   return (
//     <div className={maincontentcontainer}>
//       <FollowingUserListSection
//         onClick={onClick}
//         followingUsers={followingUsers}
//       />
//       <KanbanBoardSection onClick={onClick} userId={userId} />
//       <NoticeBoardSection onClick={onClick} />
//       <ClockInButtonSection onClick={onClick} userId={userId} />
//     </div>
//   );
// };

// export default UserMainContent;
