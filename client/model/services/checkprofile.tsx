import React, { useEffect, useState } from "react";
import { User, CheckprofileProps } from "./checkprofilemodule/usertypes";
import { fetchCheckUsers } from "./checkprofilemodule/fetchCheckUsers";

// Custom Li and Ul components
import Li from "../../atoms/li";
import Ul from "../../atoms/ul";
import Button from "../../atoms/button";

const Checkprofile: React.FC<CheckprofileProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCheckUsers(setUsers, setLoading);
  }, []);

  const handleSaveClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // 폼 제출 방지 (필요에 따라)
    try {
      await onSave(users); // 비동기 함수 호출
      console.log("사용자 정보 저장 성공");
    } catch (error) {
      console.error("사용자 정보 저장 실패:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>사용자 프로필 요청 수락하기</h2>
      <Ul ul_style="custom-ul-style"> {/* ul_style에 원하는 스타일 클래스 이름을 지정하세요. */}
        {users.map((user) => (
          <Li key={user.user_id} li_style="custom-li-style"> {/* li_style에 원하는 스타일 클래스 이름을 지정하세요. */}
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
          </Li>
        ))}
      </Ul>
      {/* <Button 
        button_text="변경사항 저장하기" 
        button_style="custom-button-style" 
        onClick={handleSaveClick} 
      /> */}
    </div>
  );
};

export default Checkprofile;
