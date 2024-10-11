import React from "react";
import {
  authmaintext,
  requestmaincontainer,
} from "client/styles/admin/requests/mainuserrequest.css";
import { usePendingUsers } from "../../client/components/MemberVerification/hook/usePendingUser";

const PendingUsersList: React.FC = () => {
  const [memberData] = usePendingUsers(); // setMemberData는 사용하지 않으므로 생략

  return (
    <div className={requestmaincontainer}>
      <div>Authorize {memberData.length} users</div>
      <div className={authmaintext}>{memberData.length}</div>
    </div>
  );
};

export default PendingUsersList;
