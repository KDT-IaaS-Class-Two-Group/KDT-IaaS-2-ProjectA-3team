import { useState } from "react";

import UserLookup from "client/model/services/userlookup";

const TestPage: React.FC = () => {
  const [status, setStatus] = useState<boolean>(false);
  return (
    <div>
      <h1>사용자 조회하기</h1>
      {status && <UserLookup />}
      <button
        onClick={() => {
          if (status === false) setStatus(true);
        }}
      >
        조회하기
      </button>
      <button>저장하기</button>
    </div>
  );
};

export default TestPage;
