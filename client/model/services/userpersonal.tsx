import React, { useEffect, useState } from "react";
import { User, Profile, UserPersonalProps } from "./userpersonalmodule/usertypes";
import { fetchUsersAndProfiles } from "./userpersonalmodule/fetchUsersAndProfiles";
import Ul from "../../refactor_component/atom/ul/ul"; 
import Li from "../../refactor_component/atom/li/li"; 
import Input from "../../refactor_component/atom/input/input"; 
import Button from "../../refactor_component/atom/button/button";
import { greenButton } from "client/styles/templatebutton.css";
import {
  listinitial,
  pendingdiv,
  pendinglist,
  pendingmaindiv,
} from "client/styles/users/attendancestyle.css";


const UserPersonal: React.FC<UserPersonalProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Map<string, string>>(); 
  const [bios, setBios] = useState<Map<string, string>>(new Map());
  const [disabledUsers, setDisabledUsers] = useState<Map<string, boolean>>(
    new Map()
  ); // 비활성화된 사용자
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsersAndProfiles = async () => {
      try {
        const { users: usersData, profiles: profileMap } = await fetchUsersAndProfiles();
        setUsers(usersData);
        setProfiles(profileMap);

        // 사용자별 자기소개 입력 상태 초기화
        const biosMap = new Map<string, string>(
          usersData.map((user) => [user.user_id, profileMap.get(user.user_id) || ""])
        );
        setBios(biosMap);

        // 사용자별 비활성화 상태 초기화
        const disabledMap = new Map<string, boolean>(
          usersData.map((user) => [user.user_id, false])
        );
        setDisabledUsers(disabledMap);
      } catch (error) {
        console.error("사용자 또는 프로필 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsersAndProfiles();
  }, []);

  const handleBioChange = (userId: string, value: string) => {
    setBios((prevBios) => new Map(prevBios).set(userId, value));
  };

  const handleSave = async () => {
    try {
      await Promise.all(
        Array.from(bios.entries()).map(([userId, bio]) =>
          fetch("http://localhost:3001/getUser/saveProfile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, bio: bio || "" }),
          })
        )
      );
      console.log("프로필 정보 저장 성공");
    } catch (error) {
      console.error("프로필 정보 저장 실패:", error);
    }
  };

  const handleDisableBio = (userId: string) => {
    setDisabledUsers((prevDisabled) => new Map(prevDisabled).set(userId, true));
    alert("비활성화되었습니다.");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>개인 프로필 조회</h1>
      <Ul ul_style={listinitial}>
        {users.map((user) => (
          <Li key={user.user_id} li_style={pendinglist}>
            <strong>아이디 : </strong> {user.user_id}
            <strong>이름 : </strong> {user.username}
            <strong>생년월일 : </strong> {user.birth_date}
            <strong>주소 : </strong> {user.address}
            <strong>핸드폰 번호 : </strong> {user.phone}
            <strong>이메일 : </strong> {user.email}
            <strong>비밀번호 : </strong> {user.password}
            <div>
              <strong>자기소개 : </strong>
              <span>
                {profiles?.get(user.user_id) || bios.get(user.user_id)}
              </span>
              {disabledUsers.get(user.user_id) && <span>(비활성화됨)</span>}
              {!disabledUsers.get(user.user_id) && (
                <div>
                  <Input
                    type="text"
                    value={bios.get(user.user_id) || ""} // bios.get(user.user_id)이 undefined일 경우 빈 문자열로 대체
                    onChange={(e) => handleBioChange(user.user_id, e.target.value)}
                    placeholder="자기소개를 입력하세요" id={""}/>
                  <Button
                    button_text="비활성화하기"
                    button_style={greenButton}
                    onClick={() => handleDisableBio(user.user_id)}
                  />
                </div>
              )}
            </div>
          </Li>
        ))}
      </Ul>
      <Button
        button_text="저장하기"
        button_style={greenButton}
        onClick={handleSave}
      />
    </div>
  );
};

export default UserPersonal;
