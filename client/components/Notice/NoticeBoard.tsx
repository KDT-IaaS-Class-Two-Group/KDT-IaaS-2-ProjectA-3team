import React from "react";
import NoticeTextOnlyContent from "../../../client/components/NoticeTextOnlyContent";

const NoticeBoard: React.FC = () => {
  return (
    <div>
      <p>Notice Board</p>
      <button>크게 보기</button>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* 관리자 게시물 표시 */}
        <div style={{ flex: 1, marginRight: "20px" }}>
          <h2>관리자 게시물</h2>
          <NoticeTextOnlyContent endpoint="http://localhost:3001/authallnotices" />
        </div>

        {/* 사용자 게시물 표시 */}
        <div style={{ flex: 1 }}>
          <h2>사용자 게시물</h2>
          <NoticeTextOnlyContent endpoint="http://localhost:3001/authnotices" />
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
