import React, { useEffect, useState } from "react";
import {
  requestmaincontainer,
  requestmaintext,
} from "client/styles/admin/requests/mainuserrequest.css";

const CheckUsersCount: React.FC = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/user/checkusers/count"
        );

        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setUserCount(data.count);
      } catch (err) {
        /* empty */
      }
    };

    fetchUserCount();
  }, []);

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div>
      {userCount !== null ? (
        <div className={requestmaincontainer}>
          <div>Requested by {userCount} users</div>
          <div className={requestmaintext}>{userCount}</div>
        </div>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default CheckUsersCount;
