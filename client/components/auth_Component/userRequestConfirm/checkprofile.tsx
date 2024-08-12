import { pagemainmain, pagemaintext } from "client/styles/team/teampage.css";
import { greenButton } from "client/styles/templatebutton.css";
import {
  buttonparent,
  listinitial,
  pendinglist,
  pendingmaindiv,
  profilelist,
} from "client/styles/users/attendancestyle.css";
import React, { useState, useEffect } from "react";

export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

const UserRequest: React.FC = () => {
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

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 사용자 정보를 가져오는 함수 호출
    fetchCheckProfile();
  }, []);

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
    <div className={pagemainmain}>
      <div className={pagemaintext}>사용자 프로필 수정 요청</div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className={pendingmaindiv}>
        {users.length > 0 ? (
          <ul className={listinitial}>
            {users.map((user) => (
              <li key={user.user_id} className={profilelist}>
                아이디 : {user.user_id}
                <br />
                이름 : {user.username}
                <br />
                생년월일 : {user.birth_date}
                <br />
                주소 : {user.address}
                <br />
                핸드폰 번호 : {user.phone}
                <br />
                이메일 : {user.email}
                <br />
                비밀번호 : {user.password}
                <br />
                <div className={buttonparent}>
                  <button
                    onClick={() => handleAccept(user.user_id)}
                    className={greenButton}
                  >
                    변경 수락
                  </button>
                  <button
                    onClick={() => handleReject(user.user_id)}
                    className={greenButton}
                  >
                    변경 거절
                  </button>
                </div>
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

export default UserRequest;
