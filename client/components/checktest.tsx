import React, { useEffect, useState } from "react";

const CheckUsersCount: React.FC = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/getUser/checkusers/count"
        );

        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setUserCount(data.count);
      } catch (err) {}
    };

    fetchUserCount();
  }, []);

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div>
      {userCount !== null ? (
        <p>현재 총 {userCount}명의 사용자가 있습니다.</p>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default CheckUsersCount;
