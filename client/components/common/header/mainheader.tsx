import React, { useEffect, useState } from "react";
import {
  fullRowSection,
  titlecontainer,
  titletext,
  admintext,
} from "client/styles/admin/greet/greet.css";
import { section } from "client/styles/admin/admindashboard.css";

interface SessionData {
  user_id: string;
  role_name: string;
}

export const MainHeader: React.FC = () => {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("/login/session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSessionData(data.session);
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
    <div className={`${section} ${fullRowSection}`}>
      <div className={titlecontainer}>
        {sessionData ? (
          <>
            <p className={titletext}>Hello {sessionData.user_id}</p>
            <p className={admintext}>{sessionData.role_name}</p>
          </>
        ) : (
          <p className={titletext}>Loading...</p>
        )}
      </div>
    </div>
  );
};
