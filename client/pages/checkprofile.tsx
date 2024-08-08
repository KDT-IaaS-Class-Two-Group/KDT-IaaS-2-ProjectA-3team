// TestPage.tsx
import React, { useState } from "react";

export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

const TestPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCheckProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3001/getUser/checkprofile"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      setError("사용자 정보 조회 실패: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (user_id: string) => {
    try {
      const response = await fetch("http://localhost:3001/getUser/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("변경사항이 수락되었습니다.");
      fetchCheckProfile(); // 데이터 새로 고침
    } catch (error) {
      console.error("변경 수락 실패:", error);
    }
  };
  const handleReject = async (user_id: string) => {
    try {
      const response = await fetch("http://localhost:3001/getUser/reject", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("변경사항이 거절되었습니다.");
      fetchCheckProfile(); // 데이터 새로 고침
    } catch (error) {
      console.error("변경 거절 실패:", error);
    }
  };

  return (
    <div>
      <h1>사용자 프로필 요청 수락하기</h1>
      <button onClick={fetchCheckProfile}>조회하기</button>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.user_id}>
                <strong>아이디: </strong> {user.user_id}
                <br />
                <strong>이름: </strong> {user.username}
                <br />
                <strong>생년월일: </strong> {user.birth_date}
                <br />
                <strong>주소: </strong> {user.address}
                <br />
                <strong>핸드폰 번호: </strong> {user.phone}
                <br />
                <strong>이메일: </strong> {user.email}
                <br />
                <strong>비밀번호: </strong> {user.password}
                <button onClick={() => handleAccept(user.user_id)}>수락</button>
                <button onClick={() => handleReject(user.user_id)}>거절</button>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <div>조회된 사용자가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
