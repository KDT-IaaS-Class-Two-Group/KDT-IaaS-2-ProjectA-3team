/**
 * @file UserPersonal.tsx
 * @brief 이 파일은 사용자 프로필을 조회하고 수정할 수 있는 사용자 개인 정보 컴포넌트를 포함하고 있습니다.
 */

import React, { useEffect, useState } from "react";
import {
  User,
  Profile,
  UserPersonalProps,
} from "./userpersonalmodule/interface/usertypes";
import { fetchUsersAndProfiles } from "./userpersonalmodule/service/fetchUsersAndProfiles";
import Ul from "../../refactor_component/atom/ul/ul";
import Li from "../../refactor_component/atom/li/li";
import Input from "../../refactor_component/atom/input/input";
import Button from "../../refactor_component/atom/button/Button";
import { greenButton } from "client/styles/templatebutton.css";
import {
  listinitial,
  pendingdiv,
  pendinglist,
  pendingmaindiv,
} from "client/styles/users/attendancestyle.css";

/**
 * @brief 사용자 프로필을 조회하고 수정할 수 있는 컴포넌트입니다.
 *
 * 이 컴포넌트는 사용자 목록과 프로필을 불러와서 화면에 표시합니다. 사용자는 자기소개를 입력하거나
 * 비활성화 버튼을 클릭하여 사용자 프로필을 수정할 수 있습니다. 수정된 정보는 서버에 저장됩니다.
 *
 * @param {UserPersonalProps} props - 컴포넌트의 props로 `onSave` 콜백 함수를 포함합니다.
 * @returns React.FC 이 컴포넌트는 React 함수형 컴포넌트입니다.
 */
const UserPersonal: React.FC<UserPersonalProps> = ({ onSave }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Map<string, string>>();
  const [bios, setBios] = useState<Map<string, string>>(new Map());
  const [disabledUsers, setDisabledUsers] = useState<Map<string, boolean>>(
    new Map()
  ); // 비활성화된 사용자
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * @brief 사용자와 프로필 데이터를 비동기적으로 불러오는 함수입니다.
     *
     * 이 함수는 `fetchUsersAndProfiles`를 호출하여 사용자 및 프로필 데이터를 가져오고,
     * 이를 상태에 저장합니다. 사용자별 자기소개와 비활성화 상태도 초기화합니다.
     */
    const loadUsersAndProfiles = async () => {
      try {
        const { users: usersData, profiles: profileMap } =
          await fetchUsersAndProfiles();
        setUsers(usersData);
        setProfiles(profileMap);

        // 사용자별 자기소개 입력 상태 초기화
        const biosMap = new Map<string, string>(
          usersData.map((user) => [
            user.user_id,
            profileMap.get(user.user_id) || "",
          ])
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

  /**
   * @brief 사용자 자기소개 입력값이 변경될 때 호출되는 핸들러입니다.
   *
   * @param {string} userId - 자기소개를 변경할 사용자 ID
   * @param {string} value - 변경된 자기소개 값
   */
  const handleBioChange = (userId: string, value: string) => {
    setBios((prevBios) => new Map(prevBios).set(userId, value));
  };

  /**
   * @brief 모든 사용자 프로필 정보를 서버에 저장하는 함수입니다.
   *
   * 프로필 정보를 서버에 POST 요청으로 전송하여 저장합니다. 요청이 성공하면 성공 메시지를
   * 로그로 출력합니다. 실패할 경우 에러를 로그로 출력합니다.
   */
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

  /**
   * @brief 특정 사용자의 자기소개를 비활성화하는 함수입니다.
   *
   * @param {string} userId - 비활성화할 사용자 ID
   */
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
                    onChange={(e) =>
                      handleBioChange(user.user_id, e.target.value)
                    }
                    placeholder="자기소개를 입력하세요"
                    id={""}
                  />
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
