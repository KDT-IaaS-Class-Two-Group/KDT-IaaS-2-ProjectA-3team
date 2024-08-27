// UserInfo.tsx
import React from "react";
import Text from "client/refactor_component/atom/Text/Text";
import { titletext, admintext } from "client/styles/admin/greet/greet.css";

interface UserInfoProps {
  userId: string;
  roleName: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ userId, roleName }) => {
  return (
    <>
      <Text content={`Hello ${userId}`} className={titletext} />
      <Text content={`Permission: ${roleName}`} className={admintext} />
    </>
  );
};

export default UserInfo;
