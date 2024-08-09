import React from "react";
import { usePendingUsers } from "../../client/components/MemberVerification/hook/usePendingUser";

const PendingUsersList: React.FC = () => {
  const [memberData] = usePendingUsers(); // setMemberData는 사용하지 않으므로 생략

  return (
    <div>
      <p>총 대기 중인 사용자 수: {memberData.length}명</p>
    </div>
  );
};

export default PendingUsersList;
