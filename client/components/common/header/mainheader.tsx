import React, { useEffect, useState } from "react";
import {
  fullRowSection,
  titlecontainer,
  titletext,
  admintext,
} from "client/styles/admin/greet/greet.css";
import { section } from "client/styles/admin/admindashboard.css";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";

interface SessionData {
  user_id: string;
  role_name: string;
}

const MainHeader: React.FC = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`${REQUEST_URL.__LOGIN}/session`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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

  return (
    <div className={fullRowSection}>
      <div className={titlecontainer}>
        {sessionData ? (
          <>
            <p className={titletext}>Hello {sessionData.user_id}</p>
            <p className={admintext}>Permission: {sessionData.role_name}</p>
            console.log(sessionData.user_id)
          </>
        ) : (
          <p className={titletext}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
