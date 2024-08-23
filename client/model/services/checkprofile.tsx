/**
 * @file Checkprofile.tsx
 * @brief 이 파일은 사용자 프로필을 조회하고, 요청을 수락할 수 있는 컴포넌트를 포함하고 있습니다.
 */

import React, { useEffect, useState } from "react";
import { User, CheckprofileProps } from "./checkprofilemodule/usertypes";
import { fetchCheckUsers } from "./checkprofilemodule/fetchCheckUsers";

// Custom Li and Ul components
import Li from "../../atoms/li";
import Ul from "../../atoms/ul";
import Button from "client/refactor_component/atom/button/button";

/**
 * @brief 사용자 프로필을 조회하고, 수락할 수 있는 컴포넌트입니다.
 * 
 * 이 컴포넌트는 사용자 프로필을 비동기적으로 불러와서 목록을 표시합니다. 사용자는 
 * 프로필 정보를 확인할 수 있으며, 저장 버튼을 클릭하여 변경 사항을 저장할 수 있습니다.
 * 
 * @param {CheckprofileProps} props - 컴포넌트의 props로 `onSave` 콜백 함수를 포함합니다.
 * @returns React.FC 이 컴포넌트는 React 함수형 컴포넌트입니다.
 */
const Checkprofile: React.FC<CheckprofileProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    /**
     * @brief 사용자 데이터를 비동기적으로 불러오는 함수입니다.
     * 
     * `fetchCheckUsers`를 호출하여 사용자 데이터를 가져오고, 이를 상태에 저장합니다.
     */
    fetchCheckUsers(setUsers, setLoading);
  }, []);

  /**
   * @brief 저장 버튼 클릭 시 호출되는 핸들러입니다.
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} event - 클릭 이벤트
   * 
   * 이 함수는 `onSave` 콜백 함수를 비동기적으로 호출하여 사용자 데이터를 저장합니다.
   * 저장이 성공하면 성공 메시지를 콘솔에 출력하며, 실패할 경우 에러 메시지를 출력합니다.
   */
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
      <Ul ul_style="custom-ul-style">
        {users.map((user) => (
          <Li key={user.user_id} li_style="custom-li-style"> 
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
      <Button 
        button_text="변경사항 저장하기" 
        button_style="custom-button-style" 
        onClick={handleSaveClick} 
      />
    </div>
  );
};

export default Checkprofile;
