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
import { User } from "./checkprofilemodule/usertypes";
import { handleAccept } from "./checkprofilemodule/handelAccept";
import { handleReject } from "./checkprofilemodule/handleReject";
import useFetchCheckProfile from "./checkprofilemodule/fetchCheckProfile";
import Ul from "../../../refactor_component/atom/ul/ul"; // Ul 컴포넌트의 올바른 경로를 사용하세요
import Li from "../../../refactor_component/atom/li/li"; // Li 컴포넌트의 올바른 경로를 사용하세요
import Button from "../../../refactor_component/atom/button/button"; // Button 컴포넌트의 올바른 경로를 사용하세요

const UserRequest: React.FC = () => {
  const { users, loading, error } = useFetchCheckProfile();

  return (
    <div className={pagemainmain}>
      <div className={pagemaintext}>사용자 프로필 수정 요청</div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className={pendingmaindiv}>
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
                  <Button
                    button_text="변경 수락"
                    button_style={greenButton}
                    onClick={() => handleAccept(user.user_id)}
                  />
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
          !loading && <div>조회된 사용자가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default UserRequest;
