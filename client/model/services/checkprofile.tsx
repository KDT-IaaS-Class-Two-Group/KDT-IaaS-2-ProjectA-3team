import React, { useEffect, useState } from "react";
import { User, CheckprofileProps } from "./checkprofilemodule/usertypes";
import { handleSave } from "./checkprofilemodule/handleSave";
import { fetchCheckUsers } from "./checkprofilemodule/fetchCheckUsers";

const Checkprofile: React.FC<CheckprofileProps> = ({ onSave }) => {
  // 이 상태 관리 코드는 Checkprofile 컴포넌트 내에 있어야 합니다.
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCheckUsers(setUsers, setLoading);
  }, []);

  const handleSaveClick = async () => {
    try {
      await handleSave(users);
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
          </li>
        ))}
      </ul>
      <button onClick={handleSaveClick}>변경사항 저장하기</button>
    </div>
  );
};

export default Checkprofile;
