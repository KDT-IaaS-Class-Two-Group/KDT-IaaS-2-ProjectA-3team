/**
 * @file PendingUserLook.tsx
 * @brief 대기 중인 사용자 목록을 조회하고 승인할 수 있는 컴포넌트를 포함합니다.
 * 
 * 
 * @author @zoeznm
 * @date 2024-08-25
 * 
 */

import React from "react";

import { User } from "client/refactor_component/organism/User_Lookup/interface/usertypes";
import { pagemainmain, pagemaintext } from "client/styles/team/teampage.css";
import UserLookup from "../User_Lookup/userlookup";
import { handleSave } from "../../organism/User_Approval/handleSave";

/**
 * @brief 대기 중인 사용자를 조회하고 승인하는 컴포넌트입니다.
 *
 * 이 컴포넌트는 `UserLookup` 컴포넌트를 포함하여, 대기 중인 사용자의 정보를 조회하고 저장하는 기능을 제공합니다.
 * `handleSave` 함수는 사용자의 정보를 서버에 저장하며, 저장 성공 여부를 콘솔에 출력합니다.
 *
 * @returns React.FC 이 컴포넌트는 React 함수형 컴포넌트입니다.
 */
const PendingUserLook: React.FC = () => {
  /**
   * @brief 사용자 정보를 서버에 저장하는 함수입니다.
   *
   * 이 함수는 사용자 정보를 서버에 POST 요청을 통해 전송합니다. 요청이 성공하면 콘솔에 성공 메시지를 출력하고,
   * 실패할 경우 오류 메시지를 출력합니다.
   *
   * @param {User[]} users - 저장할 사용자 정보의 배열입니다.
   */

  return (
    <div className={pagemainmain}>
      <div className={pagemaintext}>회원가입 대기 사용자 수락</div>
      <UserLookup onSave={handleSave} />
    </div>
  );
};

export default PendingUserLook;
