import React, { useState, useEffect } from "react";
import NoticeAuthAllContent from "./../authNotice/noticeAuthAllContent";

interface ListNotice {
  _id: string;
  title: string;
  user_id: string;
  createdAt: string;
}

const NoticeBoard: React.FC = () => {
  const [userNotices, setUserNotices] = useState<ListNotice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:3001/authnotices");
        const data: ListNotice[] = await response.json();

        // 사용자 게시물만 필터링하여 최신 3개 선택
        const userNotices = data
          .filter((notice) => notice.user_id !== "manager")
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);

        setUserNotices(userNotices);
      } catch (err) {
        console.error("데이터를 가져오는 중 오류 발생:", err);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div>
      <p>notice board</p>
      <button>크게 보기</button>

      {/* 관리자 게시물 표시 */}
      <div>
        <h2>관리자 게시물</h2>
        <NoticeAuthAllContent />
      </div>

      {/* 사용자 게시물 표시 */}
      <div>
        <h2>사용자 게시물</h2>
        {userNotices.length > 0 ? (
          userNotices.map((notice, index) => (
            <div key={notice._id}>
              <h3>
                {index + 1}. {notice.title}
              </h3>
              <h3>작성자: {notice.user_id}</h3>
              <h3>작성일: {new Date(notice.createdAt).toLocaleDateString()}</h3>
            </div>
          ))
        ) : (
          <div>게시물 없음</div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
