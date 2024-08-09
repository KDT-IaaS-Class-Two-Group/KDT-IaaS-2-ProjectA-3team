import React from "react";

interface PendingUser {
  Management: string;
  AuthorizeStateUsers: string;
  state: string;
}

const PendingUser: React.FC<PendingUser> = ({
  Management,
  AuthorizeStateUsers,
  state,
}) => {
  return (
    <div>
      <div>
        <p>User Management</p>
        <button>크게 보기</button>
      </div>
      <div>
        <p>{Management}</p>
        <p>{AuthorizeStateUsers}</p>
        <p>{state}</p>
      </div>
      <div>{/* 프로젝트 하나씩 나오게 */}</div>
    </div>
  );
};

export default PendingUser;
