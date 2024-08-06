// client/model/services/checkprofile.ts
import React, { useEffect, useState } from "react";

export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

interface CheckprofileProps {
  onSave: (checkusers: User[]) => Promise<void>;
}

const Checkprofile: React.FC<CheckprofileProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCheckUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/getUser/checkusers"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckUsers();
  }, []);

  const handleSave = async () => {
    try {
      await onSave(users);
      console.log("사용자 정보 저장 성공");
    } catch (error) {
      console.error("사용자 정보 저장 실패:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>사용자 프로필 요청 수락하기</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <strong>아이디 : </strong> {user.user_id}
            <strong>이름 : </strong> {user.username}
            <strong>생년월일 : </strong> {user.birth_date}
            <strong>주소 : </strong> {user.address}
            <strong>핸드폰 번호 : </strong> {user.phone}
            <strong>이메일 : </strong> {user.email}
            <strong>비밀번호 : </strong> {user.password}
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>변경사항 저장하기</button>
    </div>
  );
};

export default Checkprofile;
