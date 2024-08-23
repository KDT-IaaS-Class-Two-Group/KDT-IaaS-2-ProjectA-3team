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
import {User} from "./checkprofilemodule/usertypes";
import { handleAccept } from "./checkprofilemodule/handelAccept";
import { handleReject } from "./checkprofilemodule/handleReject";
import useFetchCheckProfile from "./checkprofilemodule/fetchCheckProfile";

const UserRequest: React.FC = () => {
  const { users, loading, error } = useFetchCheckProfile();

  return (
    <div className={pagemainmain}>
      <div className={pagemaintext}>사용자 프로필 수정 요청</div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
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
