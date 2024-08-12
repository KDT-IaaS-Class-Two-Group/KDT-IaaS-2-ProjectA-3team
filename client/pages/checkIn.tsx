import React, { useEffect, useState } from "react";
import {
  fullRowSection,
  titlecontainer,
  titletext,
  admintext,
} from "client/styles/admin/greet/greet.css";
import { section } from "client/styles/admin/admindashboard.css";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import ClockInOutModal from "../components/ClockInOutModal"; // ClockInOutModal 임포트

interface SessionData {
  user_id: string;
  role_name: string;
}

const MainHeader: React.FC = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 쿠키를 포함하여 요청합니다.
        });

        if (response.ok) {
          const data = await response.json();
          setSessionData(data.session);
          console.log("Session data fetched:", data.session);
        } else {
          console.error("Failed to fetch session data", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch session data", error);
      }
    };

    fetchSessionData();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`${section} ${fullRowSection}`}>
      <div className={titlecontainer}>
        {sessionData ? (
          <>
            <p className={titletext}>Hello {sessionData.user_id}</p>
            <p className={admintext}>Permssion: {sessionData.role_name}</p>
            <button onClick={handleOpenModal}>출퇴근</button>
            <ClockInOutModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              userId={sessionData.user_id} // 세션에서 가져온 user_id를 전달
            />
          </>
        ) : (
          <p className={titletext}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
