import React from "react";
import { usePendingUsers } from "../../client/components/MemberVerification/hook/usePendingUser";

const PendingUsersComponent: React.FC = () => {
  const [memberData] = usePendingUsers();

  return (
    <div>
      <p>데이터가 {memberData.length}개 있습니다</p>
    </div>
  );
};

export default PendingUsersComponent;
