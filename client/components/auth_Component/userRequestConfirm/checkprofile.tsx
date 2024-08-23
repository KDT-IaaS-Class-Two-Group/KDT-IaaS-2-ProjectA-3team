/**
 * @file UserRequest.tsx
 * @brief 사용자 프로필 수정 요청을 처리하는 컴포넌트입니다.
 */

import React from "react";
import { pagemainmain, pagemaintext } from "client/styles/team/teampage.css";
import { greenButton } from "client/styles/templatebutton.css";
import {
  buttonparent,
  listinitial,
  pendinglist,
  pendingmaindiv,
  profilelist,
} from "client/styles/users/attendancestyle.css";
import { User } from "./checkprofile_module/interface/usertypes";
import { handleAccept } from "./checkprofile_module/service/handelAccept";
import { handleReject } from "./checkprofile_module/service/handleReject";
import useFetchCheckProfile from "./checkprofile_module/hook/fetchCheckProfile";
import Ul from "../../../refactor_component/atom/ul/ul";
import Li from "../../../refactor_component/atom/li/li";
import Button from "../../../refactor_component/atom/button/Button";

/**
 * @brief 사용자 프로필 수정 요청 목록을 보여주고, 변경을 수락하거나 거절할 수 있는 컴포넌트입니다.
 *
 * `useFetchCheckProfile` 훅을 사용하여 서버로부터 사용자 목록을 불러오고, 로딩 상태와 오류 상태를 처리합니다.
 * 각 사용자는 리스트 항목으로 표시되며, 관리자는 변경 요청을 수락하거나 거절할 수 있습니다.
 *
 * @returns React.FC 이 컴포넌트는 React 함수형 컴포넌트입니다.
 */
const UserRequest: React.FC = () => {
  // 사용자 목록, 로딩 상태, 오류 메시지를 관리하는 커스텀 훅 사용
  const { users, loading, error } = useFetchCheckProfile();

  return (
    <div className={pagemainmain}>
      <div className={pagemaintext}>사용자 프로필 수정 요청</div>
      {/* 로딩 중일 때 표시할 로딩 메시지 */}
      {loading && <div>Loading...</div>}
      {/* 오류 발생 시 표시할 오류 메시지 */}
      {error && <div>{error}</div>}
      <div className={pendingmaindiv}>
        {/* 사용자 목록이 있을 때 목록을 렌더링 */}
        {users.length > 0 ? (
          <Ul ul_style={listinitial}>
            {users.map((user) => (
              <Li key={user.user_id} li_style={profilelist}>
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
                  {/* 사용자의 변경 요청을 수락 */}
                  <Button
                    button_text="변경 수락"
                    button_style={greenButton}
                    onClick={() => handleAccept(user.user_id)}
                  />
                  {/* 사용자의 변경 요청을 거절 */}
                  <Button
                    button_text="변경 거절"
                    button_style={greenButton}
                    onClick={() => handleReject(user.user_id)}
                  />
                </div>
              </Li>
            ))}
          </Ul>
        ) : (
          // 로딩이 완료되고 사용자가 없을 때 표시할 메시지
          !loading && <div>조회된 사용자가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default UserRequest;
