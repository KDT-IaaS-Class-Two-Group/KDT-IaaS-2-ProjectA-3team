/**
 * @file user_info.tsx
 * @brief 사용자 정보 컴포넌트
 * @details 이 컴포넌트는 사용자 ID와 역할 정보를 표시한다.
 *          `Text` 컴포넌트를 사용하여 인사말과 권한 정보를 렌더링하며, 스타일은 외부 CSS 모듈을 통해 적용된다.
 * @author @dalramjwi
 * @date 2024-08-29
 */

import React from "react";
import Text from "client/refactor_component/atom/Text/text";
import { titletext, admintext } from "client/styles/admin/greet/greet.css";

interface UserInfoProps {
  userId: string; // 사용자 ID
  roleName: string; // 사용자 역할 이름
}

/**
 * @brief 사용자 정보 컴포넌트
 * @details 사용자 ID와 역할 이름을 받아 해당 정보를 화면에 표시하는 컴포넌트이다.
 *          `Text` 컴포넌트를 사용하여 두 가지 정보(인사말 및 권한)를 렌더링하며, 스타일 클래스는 CSS 모듈을 통해 제공된다.
 * @param {UserInfoProps} props 사용자 ID와 역할 이름을 포함하는 속성
 * @return 사용자 ID와 역할 이름을 포함한 JSX 요소
 */
const UserInfo: React.FC<UserInfoProps> = ({ userId, roleName }) => {
  return (
    <>
      {/* 사용자 ID를 포함한 인사말 */}
      <Text content={`Hello ${userId}`} className={titletext} />
      {/* 사용자 역할 정보를 표시 */}
      <Text content={`Permission: ${roleName}`} className={admintext} />
    </>
  );
};

export default UserInfo;
