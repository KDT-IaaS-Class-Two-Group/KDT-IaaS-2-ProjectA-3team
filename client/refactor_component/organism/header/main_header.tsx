// MainHeader.tsx
import React, { useEffect, useState } from "react";
import { fullRowSection, titlecontainer, titletext } from "client/styles/admin/greet/greet.css";
import REQUEST_URL from "client/ts/enum/request/REQUEST_URL.ENUM";
import UserInfo from "client/refactor_component/molecule/info/user_info";
import Text from "client/refactor_component/atom/text/text";

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
          <UserInfo userId={sessionData.user_id} roleName={sessionData.role_name} />
        ) : (
          <Text content="Loading..." className={titletext} />
        )}
      </div>
    </div>
  );
};

export default MainHeader;
