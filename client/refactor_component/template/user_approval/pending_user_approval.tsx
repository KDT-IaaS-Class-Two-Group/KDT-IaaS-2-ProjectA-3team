import React from "react";
import PendingUser from "client/refactor_component/organism/user_approval/PendingUserLook"; // 컴포넌트로 가져오기

/**
 * @brief 사용자 관리 Template
 * 이 Template은 여러 Organism을 결합하여 하나의 페이지 구조를 만듭니다.
 */
const UserManagementTemplate: React.FC = () => {
  return (
    <div>
      <header>
        <h1>사용자 관리 페이지</h1>
      </header>
      <main>
        <PendingUser /> {/* PendingUser 컴포넌트를 사용 */}
      </main>
    </div>
  );
};

export default UserManagementTemplate;
