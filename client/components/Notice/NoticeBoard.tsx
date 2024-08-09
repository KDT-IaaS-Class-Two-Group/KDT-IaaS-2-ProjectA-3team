import React from "react";

const NoticeBoard: React.FC = () => {
  return (
    <div>
      <p>notice board</p>
      <button>크게 보기</button>
      <div>
        <p>별Manager</p>
        {/* 최신 순 글 3개 조회 */}
      </div>
      <div>
        <p>별User</p>
        {/* 최신 �� �� 3개 조회 */}
      </div>
    </div>
  );
};

export default NoticeBoard;
